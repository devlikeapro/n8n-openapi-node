import {INodeProperties, NodePropertyTypes} from 'n8n-workflow/dist/Interfaces';
import * as lodash from 'lodash';
import {OpenAPIV3} from 'openapi-types';
import {RefResolver} from "./openapi/RefResolver";
import pino from 'pino';
import {OpenAPIWalker} from "./openapi/OpenAPIWalker";
import {ResourcePropertiesCollector, toResource} from "./ResourcePropertiesCollector";
import {SchemaExample} from "./openapi/SchemaExample";

interface Action {
    uri: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
}

/**
 * /api/entities/{entity} => /api/entities/{{$parameter["entity"]}}
 */
function replaceToParameter(uri: string): string {
    return uri.replace(/{([^}]*)}/g, '{{$parameter["$1"]}}');
}

const HttpMethods: string[] = Object.values(OpenAPIV3.HttpMethods);

function sessionFirst(a: any, b: any) {
    if (a.name === 'session') {
        return -1;
    }
    if (b.name === 'session') {
        return 1;
    }
    return 0;
}

export interface ParserConfig {
    logger?: pino.Logger;
    addUriAfterOperation: boolean;
}

export class Parser {
    public resourceNode?: INodeProperties;
    public operations: INodeProperties[];
    public fields: INodeProperties[];

    private operationByResource: Map<string, any[]> = new Map();
    private logger: pino.Logger
    private readonly addUriAfterOperation: boolean;

    private readonly doc: OpenAPIV3.Document;

    // OpenAPI helpers
    private readonly walker: OpenAPIWalker;
    private schemaExample: SchemaExample;
    private refResolver: RefResolver;

    constructor(doc: any, config?: ParserConfig) {
        this.doc = doc
        this.operations = [];
        this.fields = [];

        this.logger = config?.logger || pino()
        this.addUriAfterOperation = config ? config.addUriAfterOperation : true
        this.walker = new OpenAPIWalker(this.doc)
        this.refResolver = new RefResolver(doc)
        this.schemaExample = new SchemaExample(doc)
    }

    get properties(): INodeProperties[] {
        if (!this.resourceNode) {
            throw new Error('Resource node not found');
        }
        return [this.resourceNode, ...this.operations, ...this.fields];
    }

    private get paths(): OpenAPIV3.PathsObject {
        return this.doc.paths;
    }

    process() {
        this.parseResources();
        this.parseOperations();
        this.postProcessOperations();
    }

    parse(resource: string, action: Action): INodeProperties[] {
        const fieldNodes: any[] = [];
        const options: any[] = [];
        const ops: OpenAPIV3.PathItemObject = this.paths[action.uri]!!;
        const operation = ops[action.method as OpenAPIV3.HttpMethods]!!;
        const {option, fields} = this.parseOperation(resource, operation, action.uri, action.method);
        options.push(option);
        fieldNodes.push(...fields);

        // eslint-disable-next-line
        const operations = {
            displayName: 'Operation',
            name: 'operation',
            type: 'options',
            noDataExpression: true,
            displayOptions: {
                show: {
                    resource: [resource],
                },
            },
            options: options,
            default: '',
        };

        return [operations, ...fieldNodes] as INodeProperties[];
    }

    parseOperation(
        resourceName: string,
        operation: OpenAPIV3.OperationObject,
        uri: string,
        method: string,
    ) {
        let operationId: string = operation.operationId!!.split('_').slice(1).join('_');
        if (!operationId) {
            operationId = operation.operationId as string
        }

        const name = lodash.startCase(operationId);
        const description = operation.description || operation.summary || '';
        const option = {
            name: name,
            value: name,
            action: operation.summary || name,
            description: description,
            routing: {
                request: {
                    method: method.toUpperCase(),
                    url: `=${replaceToParameter(uri)}`,
                },
            },
        };
        const fields = this.parseFields(resourceName, name, operation);

        if (this.addUriAfterOperation) {
            const notice = {
                displayName: `${method.toUpperCase()} ${uri}`,
                name: 'operation',
                type: 'notice',
                typeOptions: {
                    theme: 'info',
                },
                displayOptions: {
                    show: {
                        resource: [resourceName],
                        operation: [name],
                    },
                },
                default: '',
            };
            // @ts-ignore
            fields.unshift(notice);
        }

        return {
            option: option,
            fields: fields,
        };
    }

    parseFields(resourceName: string, operationName: string, operation: any) {
        const fields = [];

        const parameterFields = this.parseParameterFields(
            operation.parameters,
            resourceName,
            operationName,
        );
        fields.push(...parameterFields);
        const bodyFields = this.parseRequestBody(operation.requestBody, resourceName, operationName);
        fields.push(...bodyFields);
        // sort fields, so "session" always top
        fields.sort(sessionFirst);
        return fields;
    }

    parseResources() {
        const collector = new ResourcePropertiesCollector(this.logger)
        this.walker.walk(collector)
        this.resourceNode = collector.props
    }

    private parseParameterFields(parameters: any[], resourceName: string, operationName: string) {
        if (!parameters) {
            return [];
        }
        const fields = [];
        for (const parameter of parameters) {
            const field = this.parseParam(parameter, resourceName, operationName);
            const isQuery = parameter.in === 'query';
            if (isQuery) {
                field.routing = {
                    request: {
                        qs: {
                            [parameter.name]: '={{ $value }}',
                        },
                    },
                };
            }
            fields.push(field);
        }
        return fields;
    }

    private parseParam(parameter: any, resourceName: string, operationName: string) {
        const name = parameter.name;
        let schemaType = parameter.schema.type;
        if (!schemaType) {
            if (parameter.schema['$ref'] || parameter.schema['oneOf'] || parameter.schema['allOf']) {
                schemaType = 'json';
            }
        }

        let type: NodePropertyTypes;
        let defaultValue = parameter.example;
        if (defaultValue === undefined) {
            defaultValue = this.schemaExample.extractExample(parameter.schema)
        }
        switch (schemaType) {
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
            case 'json':
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
            default:
                throw new Error(`Type '${schemaType}' not supported - '${name}'`);
        }

        const field: INodeProperties = {
            displayName: lodash.startCase(name),
            name: name,
            type: type,
            required: parameter.required || undefined,
            displayOptions: {
                show: {
                    resource: [resourceName],
                    operation: [operationName],
                },
            },
            default: defaultValue,
            // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
            description: parameter.description || parameter.schema.description,
        };
        if ('enum' in parameter.schema && schemaType === 'string') {
            field.type = 'options';
            field.options = parameter.schema.enum.map((value: string) => {
                return {
                    name: lodash.startCase(value),
                    value: value,
                };
            });
            // @ts-ignore
            field.default = field.default ? field.default : field.options!![0].value;
        }

        return field;
    }

    private parseRequestBody(
        requestBody: any,
        resourceName: string,
        operationName: string,
    ): INodeProperties[] {
        if (!requestBody) {
            return [];
        }
        const content = requestBody.content['application/json'] || requestBody.content['application/json; charset=utf-8'];
        if (!content) {
            this.logger.warn(`No 'application/json' content found for operation '${operationName}'`);
            return []
        }
        const requestBodySchema = content.schema;
        const requestSchema = this.resolveSchema(requestBodySchema);
        if (requestSchema.type != 'object') {
            this.logger.warn(`Request body schema type '${requestSchema.type}' not supported for operation '${operationName}'`);
        }
        const properties = requestSchema.properties;
        const fields = [];
        for (const key in properties) {
            const property = properties[key];
            const field = this.parseParam(
                {
                    name: key,
                    schema: property,
                    required: requestSchema.required && requestSchema.required?.includes(key),
                    // @ts-ignore
                    description: property.description,
                },
                resourceName,
                operationName,
            );
            if (field.type === 'json') {
                field.routing = {
                    request: {
                        body: {
                            [key]: '={{ JSON.parse($value) }}',
                        },
                    },
                };
            } else {
                field.routing = {
                    request: {
                        body: {
                            [key]: '={{ $value }}',
                        },
                    },
                };
            }
            fields.push(field);
        }
        return fields;
    }

    private resolveSchema(schema: any) {
        return this.refResolver.resolve(schema)
    }

    private parseOperations() {
        let uri: string;
        let pathItem: OpenAPIV3.PathItemObject;
        // @ts-ignore
        for ([uri, pathItem] of Object.entries(this.paths)) {
            let method: string;
            let operation: OpenAPIV3.OperationObject;

            // @ts-ignore
            for ([method, operation] of Object.entries(pathItem)) {
                if (!HttpMethods.includes(method)) {
                    continue;
                }
                if (operation.deprecated) {
                    continue;
                }
                const tags = operation.tags;
                if (!tags || tags.length === 0) {
                    throw new Error(`No tags found for operation '${operation}'`);
                }
                const resourceName = toResource(tags[0]);
                const {option, fields} = this.parseOperation(resourceName, operation, uri, method);
                this.addOption(resourceName, option);
                this.addFields(fields);
            }
        }
    }

    private postProcessOperations() {
        for (const [resource, options] of this.operationByResource) {
            // eslint-disable-next-line
            const operation = {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: [resource],
                    },
                },
                options: options,
                default: '',
            };
            // @ts-ignore
            this.addOperation(operation);
        }
    }

    private addOption(resourceName: string, option: any) {
        if (!this.operationByResource.has(resourceName)) {
            this.operationByResource.set(resourceName, []);
        }
        const options = this.operationByResource.get(resourceName)!!;
        if (lodash.find(options, {value: option.value})) {
            throw new Error(`Duplicate operation '${option.value}' for resource '${resourceName}'`);
        }

        options.push(option);
    }

    private addFields(fields: INodeProperties[]) {
        this.fields.push(...fields);
    }

    private addOperation(operation: INodeProperties) {
        this.operations.push(operation);
    }
}
