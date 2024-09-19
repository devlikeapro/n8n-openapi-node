import {OpenAPIVisitor, OperationContext} from "./openapi/OpenAPIVisitor";
import pino from "pino";
import {OpenAPIV3} from "openapi-types";
import {INodeProperties} from "n8n-workflow/dist/Interfaces";
import {N8NINodeProperties} from "./SchemaToINodeProperties";
import {IOperationParser, N8NOperationParser} from "./OperationParser";
import {OptionsByResourceMap} from "./n8n/OptionsByResourceMap";

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

export class BaseOperationsCollector implements OpenAPIVisitor {
    public readonly _fields: INodeProperties[]
    private optionsByResource: OptionsByResourceMap = new OptionsByResourceMap()
    private readonly logger: pino.Logger;
    private n8nNodeProperties: N8NINodeProperties;

    // Dependency injection light version
    protected operationParser: IOperationParser = new N8NOperationParser()

    constructor(logger: pino.Logger, doc: any) {
        this.logger = logger.child({class: 'OperationsCollector'});
        this._fields = []
        this.n8nNodeProperties = new N8NINodeProperties(this.logger, doc)
    }

    get operations(): INodeProperties[] {
        if (this.optionsByResource.size === 0) {
            throw new Error('No operations found in OpenAPI document')
        }

        const operations = []
        for (const [resource, options] of this.optionsByResource) {
            const operation: INodeProperties = {
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
            operations.push(operation);
        }
        return operations
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
        const operationName = option.name;
        this.addDisplayOption(fields, resourceName, operationName)
        this.optionsByResource.add(resourceName, option);
        this._fields.push(...fields)
    }

    protected parseOperation(operation: OpenAPIV3.OperationObject, context: OperationContext) {
        const method = context.method
        const uri = context.pattern;
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
}

export class OperationsCollector extends BaseOperationsCollector {
    protected parseOperation(operation: OpenAPIV3.OperationObject, context: OperationContext) {
        const result = super.parseOperation(operation, context)
        const notice: INodeProperties = {
            displayName: `${context.method.toUpperCase()} ${context.pattern}`,
            name: 'operation',
            type: 'notice',
            typeOptions: {
                theme: 'info',
            },
            default: '',
        };
        result.fields.unshift(notice);
        return result
    }
}
