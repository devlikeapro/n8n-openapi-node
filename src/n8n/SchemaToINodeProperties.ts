import { OpenAPIV3 } from "openapi-types";
import { INodeProperties, NodePropertyTypes } from "n8n-workflow";
import { RefResolver } from "../openapi/RefResolver";
import * as lodash from "lodash";
import { SchemaExample } from "../openapi/SchemaExample";

type Schema = OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
type FromSchemaNodeProperty = Pick<INodeProperties, 'type' | 'default' | 'description' | 'options'>;

function combine(...sources: Partial<INodeProperties>[]): INodeProperties {
    const obj = lodash.defaults({}, ...sources)
    if (!obj.required) {
        // n8n does want to have required: false|null|undefined
        delete obj.required
    }
    // Remove undefined values to prevent them from appearing in output
    Object.keys(obj).forEach(key => {
        if (obj[key] === undefined) {
            delete obj[key];
        }
    });
    return obj
}

/**
 * in obj find key starts with regexp
 * Return first match VALUE of the key
 */
function findKey(obj: any, regexp: RegExp): any | undefined {
    const key = Object.keys(obj).find((key) => regexp.test(key))
    return key ? obj[key] : undefined
}

/**
 * One level deep - meaning only top fields of the schema
 * The rest represent as JSON string
 */
export class N8NINodeProperties {
    private refResolver: RefResolver;
    private schemaExample: SchemaExample;

    constructor(doc: any) {
        this.refResolver = new RefResolver(doc)
        this.schemaExample = new SchemaExample(doc)
    }

    fromSchema(schema: Schema): FromSchemaNodeProperty {
        schema = this.refResolver.resolve<OpenAPIV3.SchemaObject>(schema)
        let type: NodePropertyTypes;
        let defaultValue = this.schemaExample.extractExample(schema)

        switch (schema.type) {
            case 'boolean':
                type = 'boolean';
                defaultValue = defaultValue !== undefined ? defaultValue : true;
                break;
            case 'string':
            case undefined:
                type = 'string';
                defaultValue = defaultValue !== undefined ? defaultValue : '';
                break;
            case 'object':
                type = 'json';
                defaultValue = defaultValue !== undefined ? JSON.stringify(defaultValue, null, 2) : '{}';
                break;
            case 'array':
                type = 'json';
                defaultValue = defaultValue !== undefined ? JSON.stringify(defaultValue, null, 2) : '[]';
                break;
            case 'number':
            case 'integer':
                type = 'number';
                defaultValue = defaultValue !== undefined ? defaultValue : 0;
                break;
        }

        const field: FromSchemaNodeProperty = {
            type: type,
            default: defaultValue,
            description: schema.description,
        };
        if (schema.enum && schema.enum.length > 0) {
            field.type = 'options';
            field.options = schema.enum.map((value: string) => {
                return {
                    name: lodash.startCase(value),
                    value: value,
                };
            });
            field.default = field.default ? field.default : schema.enum[0];
        }
        return field;
    }

    fromParameter(parameter: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject): INodeProperties {
        parameter = this.refResolver.resolve<OpenAPIV3.ParameterObject>(parameter)
        let fieldSchemaKeys
        if (parameter.schema) {
            fieldSchemaKeys = this.fromSchema(parameter.schema!!);
        }
        if (!fieldSchemaKeys) {
            const regexp = /application\/json.*/
            const content = findKey(parameter.content, regexp)
            fieldSchemaKeys = this.fromSchema(content.schema);
        }
        if (!fieldSchemaKeys) {
            throw new Error(`Parameter schema nor content not found`)
        }

        // Handle array query parameters specially
        const schema = this.refResolver.resolve<OpenAPIV3.SchemaObject>(parameter.schema || (parameter.content && findKey(parameter.content, /application\/json.*/)?.schema));
        const isArrayQueryParam = parameter.in === 'query' && schema && schema.type === 'array';

        if (isArrayQueryParam) {
            fieldSchemaKeys = this.fromArrayQueryParameter(schema, parameter);
        }

        const fieldParameterKeys: Partial<INodeProperties> = {
            displayName: lodash.startCase(parameter.name),
            name: encodeURIComponent(parameter.name.replace(/\./g, "-")),
            required: parameter.required,
            ...(parameter.description && { description: parameter.description }),
            ...(parameter.example !== undefined && { default: parameter.example }),
        };
        const field = combine(fieldParameterKeys, fieldSchemaKeys)

        switch (parameter.in) {
            case "query":
                if (isArrayQueryParam) {
                    // Array query parameters need special routing
                    field.routing = this.getArrayQueryRouting(parameter, schema);
                } else {
                    field.routing = {
                        send: {
                            type: 'query',
                            property: parameter.name,
                            value: '={{ $value }}',
                            propertyInDotNotation: false,
                        },
                    };
                }
                break;
            case "path":
                field.required = true
                break
            case "header":
                field.routing = {
                    request: {
                        headers: {
                            [parameter.name]: '={{ $value }}',
                        },
                    },
                };
                break
            default:
                throw new Error(`Unknown parameter location '${parameter.in}'`);
        }
        if (!field.required) {
            delete field.required
        }
        return field
    }

    private fromArrayQueryParameter(schema: OpenAPIV3.SchemaObject, parameter: OpenAPIV3.ParameterObject): Partial<INodeProperties> {
        // Type guard to ensure this is an array schema
        if (schema.type !== 'array' || !schema.items) {
            throw new Error('fromArrayQueryParameter called with non-array schema');
        }

        const itemsSchema = this.refResolver.resolve<OpenAPIV3.SchemaObject>(schema.items);
        let defaultValue = this.schemaExample.extractExample(schema);

        // For array query parameters, we typically want a fixedCollection type
        // that allows users to add multiple items
        const field: Partial<INodeProperties> = {
            type: 'fixedCollection',
            default: {},
            description: schema.description || parameter.description,
            typeOptions: {
                multipleValues: true,
            },
            options: [
                {
                    name: 'items',
                    displayName: 'Items',
                    values: [
                        {
                            displayName: 'Value',
                            name: 'value',
                            type: this.getArrayItemType(itemsSchema),
                            default: this.getArrayItemDefault(itemsSchema),
                            description: itemsSchema.description || `Item value (${itemsSchema.type || 'any'})`,
                        }
                    ]
                }
            ]
        };

        // If we have a specific example, use it for the default
        if (defaultValue !== undefined && Array.isArray(defaultValue) && defaultValue.length > 0) {
            field.default = {
                items: defaultValue.map(val => ({ value: val }))
            };
        }

        return field;
    }

    private getArrayItemType(itemsSchema: OpenAPIV3.SchemaObject): NodePropertyTypes {
        switch (itemsSchema.type) {
            case 'boolean':
                return 'boolean';
            case 'number':
            case 'integer':
                return 'number';
            case 'string':
            default:
                return 'string';
        }
    }

    private getArrayItemDefault(itemsSchema: OpenAPIV3.SchemaObject): any {
        const defaultValue = this.schemaExample.extractExample(itemsSchema);
        if (defaultValue !== undefined) {
            return defaultValue;
        }

        switch (itemsSchema.type) {
            case 'boolean':
                return false;
            case 'number':
            case 'integer':
                return 0;
            case 'string':
            default:
                return '';
        }
    }

    private getArrayQueryRouting(parameter: OpenAPIV3.ParameterObject, schema: OpenAPIV3.SchemaObject): any {
        // Handle different array serialization styles
        const style = parameter.style || 'form';
        const explode = parameter.explode !== false; // Default is true for form style

        if (style === 'form' && explode) {
            // For form+explode style (most common for array query params)
            // This handles cases like ?tags=tag1&tags=tag2 or ?sw_corner[]=1&sw_corner[]=2
            return {
                send: {
                    type: 'query',
                    property: parameter.name,
                    value: '={{ $value.items ? $value.items.map(item => item.value) : [] }}',
                    propertyInDotNotation: false,
                },
            };
        } else if (style === 'form' && !explode) {
            // For form+no-explode style: ?tags=tag1,tag2
            return {
                send: {
                    type: 'query',
                    property: parameter.name,
                    value: '={{ $value.items ? $value.items.map(item => item.value).join(",") : "" }}',
                    propertyInDotNotation: false,
                },
            };
        } else {
            // Default fallback to form+explode behavior
            return {
                send: {
                    type: 'query',
                    property: parameter.name,
                    value: '={{ $value.items ? $value.items.map(item => item.value) : [] }}',
                    propertyInDotNotation: false,
                },
            };
        }
    }

    fromParameters(parameters: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[] | undefined): INodeProperties[] {
        if (!parameters) {
            return [];
        }
        const fields = [];
        for (const parameter of parameters) {
            const field = this.fromParameter(parameter)
            fields.push(field);
        }
        return fields;
    }

    fromSchemaProperty(name: string, property: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject): INodeProperties {
        const fieldSchemaKeys: FromSchemaNodeProperty = this.fromSchema(property)
        const fieldParameterKeys: Partial<INodeProperties> = {
            displayName: lodash.startCase(name),
            name: name.replace(/\./g, "-"),
        }
        const field = combine(fieldParameterKeys, fieldSchemaKeys)
        return field
    }

    fromRequestBody(body: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject | undefined): INodeProperties[] {
        if (!body) {
            return [];
        }
        body = this.refResolver.resolve<OpenAPIV3.RequestBodyObject>(body)
        const regexp = /application\/json.*/
        const content = findKey(body.content, regexp)
        if (!content) {
            throw new Error(`No '${regexp}' content found`);
        }
        const requestBodySchema = content.schema!!;
        const schema = this.refResolver.resolve<OpenAPIV3.SchemaObject>(requestBodySchema)
        if (!schema.properties && schema.type != 'object' && schema.type != 'array') {
            throw new Error(`Request body schema type '${schema.type}' not supported`);
        }

        const fields = [];
        if (schema.type === "array" && schema.items) {
            const innerSchema = this.refResolver.resolve<OpenAPIV3.SchemaObject>(schema.items)
            const fieldPropertyKeys: FromSchemaNodeProperty = this.fromSchemaProperty("body", innerSchema)
            const fieldDefaults: Partial<INodeProperties> = {
                required: !!schema.required
            }
            const field = combine(fieldDefaults, fieldPropertyKeys)
            field.routing = {
                request: {
                    body: '={{ JSON.parse($value) }}'
                },
            };
            fields.push(field);
        }


        const properties = schema.properties;
        for (const key in properties) {
            const property = properties[key];
            const fieldPropertyKeys: FromSchemaNodeProperty = this.fromSchemaProperty(key, property)
            const fieldDefaults: Partial<INodeProperties> = {
                required: schema.required && schema.required?.includes(key),
            }
            const field = combine(fieldDefaults, fieldPropertyKeys)
            if (field.type === 'json') {
                field.routing = {
                    send: {
                        "property": key,
                        "propertyInDotNotation": false,
                        "type": "body",
                        "value": '={{ JSON.parse($value) }}'
                    },
                };
            } else {
                field.routing = {
                    send: {
                        "property": key,
                        "propertyInDotNotation": false,
                        "type": "body",
                        "value": '={{ $value }}'
                    },
                };
            }
            fields.push(field);
        }
        return fields;
    }
}
