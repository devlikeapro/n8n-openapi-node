import {OpenAPIVisitor, OperationContext} from "./openapi/OpenAPIVisitor";
import pino from "pino";
import {OpenAPIV3} from "openapi-types";
import {INodeProperties} from "n8n-workflow/dist/Interfaces";
import * as lodash from "lodash";
import {N8NINodeProperties} from "./SchemaToINodeProperties";
import {IOperationParser, N8NOperationParser} from "./OperationParser";

/**
 * /api/entities/{entity} => /api/entities/{{$parameter["entity"]}}
 */
function replaceToParameter(uri: string): string {
    return uri.replace(/{([^}]*)}/g, '{{$parameter["$1"]}}');
}

function sessionFirst(a: any, b: any) {
    if (a.name === 'session') {
        return -1;
    }
    if (b.name === 'session') {
        return 1;
    }
    return 0;
}

export class OperationsCollector implements OpenAPIVisitor {
    public readonly _fields: INodeProperties[]
    private operationByResource: Map<string, any[]> = new Map();
    private readonly logger: pino.Logger;
    private readonly _operations: INodeProperties[];
    private n8nNodeProperties: N8NINodeProperties;

    // Dependency injection light version
    protected operationParser: IOperationParser = new N8NOperationParser()

    constructor(logger: pino.Logger, doc: any, private addUriAfterOperation: boolean) {
        this.logger = logger.child({class: 'OperationsCollector'});
        this._fields = []
        this._operations = []
        this.n8nNodeProperties = new N8NINodeProperties(this.logger, doc)
    }

    get operations() {
        if (this._operations.length === 0) {
            throw new Error('No operations found in OpenAPI document')
        }
        return [...this._operations]
    }

    get fields() {
        return [...this._fields]
    }

    visitOperation(operation: OpenAPIV3.OperationObject, context: OperationContext) {
        // TODO: Move to new mixin or what?
        if (operation.deprecated) {
            return;
        }
        const tags = operation.tags;
        if (!tags || tags.length === 0) {
            throw new Error(`No tags found for operation '${operation}'`);
        }
        const {option, fields} = this.parseOperation(operation, context);
        const resourceName = this.operationParser.getResourceName(operation, context);
        this.addOption(resourceName, option);
        this.addFields(fields);
    }

    parseOperation(operation: OpenAPIV3.OperationObject, context: OperationContext) {
        const method = context.method
        const uri = context.pattern;
        const resourceName = this.operationParser.getResourceName(operation, context);
        const operationName = this.operationParser.getOperationName(operation, context);
        const optionAction = this.operationParser.getOptionAction(operation, context);
        const description = this.operationParser.getOptionDescription(operation, context)

        const option = {
            name: operationName,
            value: operationName,
            action: optionAction,
            description: description,
            routing: {
                request: {
                    method: method.toUpperCase(),
                    url: `=${replaceToParameter(uri)}`,
                },
            },
        };
        const fields = this.parseFields(operation);

        if (this.addUriAfterOperation) {
            // TODO: Move to new mixin or what?
            const notice: INodeProperties = {
                displayName: `${method.toUpperCase()} ${uri}`,
                name: 'operation',
                type: 'notice',
                typeOptions: {
                    theme: 'info',
                },
                default: '',
            };
            fields.unshift(notice);
        }

        this.addDisplayOption(fields, resourceName, operationName)
        return {
            option: option,
            fields: fields,
        };
    }

    addDisplayOption(fields: INodeProperties[], resource: string, operation: string) {
        const displayOptions = {
            show: {
                resource: [resource],
                operation: [operation],
            },
        }
        fields.forEach((field) => {
            field.displayOptions = displayOptions
        })
    }

    parseFields(operation: OpenAPIV3.OperationObject) {
        const fields = [];
        const parameterFields = this.n8nNodeProperties.fromParameters(operation.parameters)
        fields.push(...parameterFields);
        const bodyFields = this.n8nNodeProperties.fromRequestBody(operation.requestBody)
        fields.push(...bodyFields);
        // sort fields, so "session" always top
        fields.sort(sessionFirst);
        return fields;
    }

    finish() {
        for (const [resource, options] of this.operationByResource) {
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
        this._fields.push(...fields);
    }

    private addOperation(operation: INodeProperties) {
        this._operations.push(operation);
    }
}
