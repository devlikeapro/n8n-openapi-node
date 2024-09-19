import {OpenAPIVisitor} from "./openapi/OpenAPIVisitor";
import pino from "pino";
import {OpenAPIV3} from "openapi-types";
import {INodeProperties} from "n8n-workflow/dist/Interfaces";
import * as lodash from "lodash";
import {toResource} from "./ResourcePropertiesCollector";
import {N8NINodeProperties} from "./SchemaToINodeProperties";

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

    visitOperation(pattern: string,
                   path: OpenAPIV3.PathItemObject,
                   method: OpenAPIV3.HttpMethods,
                   operation: OpenAPIV3.OperationObject,
    ) {
        if (operation.deprecated) {
            return;
        }
        const tags = operation.tags;
        if (!tags || tags.length === 0) {
            throw new Error(`No tags found for operation '${operation}'`);
        }
        const resourceName = toResource(tags[0]);
        const {option, fields} = this.parseOperation(resourceName, operation, pattern, method);
        this.addOption(resourceName, option);
        this.addFields(fields);
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

        const operationName = lodash.startCase(operationId);
        const description = operation.description || operation.summary || '';
        const option = {
            name: operationName,
            value: operationName,
            action: operation.summary || operationName,
            description: description,
            routing: {
                request: {
                    method: method.toUpperCase(),
                    url: `=${replaceToParameter(uri)}`,
                },
            },
        };
        const fields = this.parseFields(resourceName, operationName, operation);

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
                        operation: [operationName],
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
        const parameterFields = this.n8nNodeProperties.fromParameters(operation.parameters)
        fields.push(...parameterFields);
        const bodyFields = this.n8nNodeProperties.fromRequestBody(operation.requestBody)
        fields.push(...bodyFields);

        const displayOptions = {
            show: {
                resource: [resourceName],
                operation: [operationName],
            },
        }
        fields.forEach((field) => {
            field.displayOptions = displayOptions
        })

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
