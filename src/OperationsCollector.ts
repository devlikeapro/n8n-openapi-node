import {OpenAPIVisitor, OperationContext} from "./openapi/OpenAPIVisitor";
import * as lodash from "lodash";
import pino from "pino";
import {OpenAPIV3} from "openapi-types";
import {N8NINodeProperties} from "./n8n/SchemaToINodeProperties";
import {IOperationParser} from "./OperationParser";
import {OptionsByResourceMap} from "./n8n/OptionsByResourceMap";
import {INodeProperties} from "n8n-workflow";
import {replacePathVarsToParameter} from "./n8n/utils";
import {IResourceParser} from "./ResourceParser";
import {
    BinaryFileType,
    INodeExecutionData, INodePropertyRouting,
    INodeRequestOutput
} from "n8n-workflow/dist/Interfaces";
import ResponseObject = OpenAPIV3.ResponseObject;

export class BaseOperationsCollector implements OpenAPIVisitor {
    public readonly _fields: INodeProperties[]
    private optionsByResource: OptionsByResourceMap = new OptionsByResourceMap()
    private n8nNodeProperties: N8NINodeProperties;

    // Log context
    private bindings: any

    constructor(
        doc: any,
        protected operationParser: IOperationParser,
        protected resourceParser: IResourceParser,
        protected logger: pino.Logger
    ) {
        this._fields = []
        this.n8nNodeProperties = new N8NINodeProperties(doc)
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
        const bindings = {
            operation: {
                pattern: context.pattern,
                method: context.method,
                operationId: operation.operationId
            }
        }
        this.bindings = bindings
        try {
            this._visitOperation(operation, context)
        } catch (error) {
            // @ts-ignore
            const data = {...this.bindings, error: `${error}`}
            // @ts-ignore
            this.logger.warn(data, 'Failed to parse operation')
        }
    }

    _visitOperation(operation: OpenAPIV3.OperationObject, context: OperationContext) {
        if (this.operationParser.shouldSkip(operation, context)) {
            this.logger.info(this.bindings, 'Skipping operation')
            return
        }
        const {option, fields: operationFields} = this.parseOperation(operation, context);
        const resources = operation.tags!!.map((tag: string) => this.resourceParser.value({name: tag}))
        for (const resourceName of resources) {
            const fields = lodash.cloneDeep(operationFields)
            const operationName = option.name;
            this.addDisplayOption(fields, resourceName, operationName)
            this.optionsByResource.add(resourceName, option);
            this._fields.push(...fields)
        }
    }

    /**
     * Parse fields from operation, both parameters and request body
     */
    parseFields(operation: OpenAPIV3.OperationObject, context: OperationContext) {
        const fields = [];
        const parameterFields = this.n8nNodeProperties.fromParameters(operation.parameters)
        fields.push(...parameterFields);

        try {
            const bodyFields = this.n8nNodeProperties.fromRequestBody(operation.requestBody)
            fields.push(...bodyFields);
        } catch (error) {
            const data = {...this.bindings, error: `${error}`}
            // @ts-ignore
            this.logger.warn(data, 'Failed to parse request body')
            const msg = "There's no body available for request, kindly use HTTP Request node to send body"
            const notice: INodeProperties = {
                displayName: `${context.method.toUpperCase()} ${context.pattern}<br/><br/>${msg}`,
                name: 'operation',
                type: 'notice',
                default: '',
            }
            fields.push(notice)
        }
        return fields;
    }

    private addDisplayOption(fields: INodeProperties[], resource: string, operation: string) {
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

    protected parseOperation(operation: OpenAPIV3.OperationObject, context: OperationContext) {
        const method = context.method;
        const uri = context.pattern;
        const parser = this.operationParser;
        let returns_raw_data = operation.responses &&
            Object.entries(operation.responses)
                .filter(([code, data]) =>
                    code.startsWith("2") && 'content' in data && data.content
                )
                .map(([_, data]) => (data as ResponseObject).content)
                .map((content) => Object.keys(content!))
                .flat()
                .filter((contentType) => contentType.match(/^(image|audio|video|text)\/[a-z0-9.+-]+$|^application\/pdf$/i))
                .length > 0;
        let output: INodeRequestOutput | undefined = undefined
        if (returns_raw_data) {
            let file_type = (type: String): BinaryFileType | undefined => {
                if (type.startsWith('image/')) return 'image';
                if (type.startsWith('audio/')) return 'audio';
                if (type.startsWith('video/')) return 'video';
                if (type === 'text/html') return 'html';
                if (type.startsWith('text/')) return 'text';
                if (type === 'application/pdf') return 'pdf';
                return undefined;
            };
            output = {
                postReceive: [async (items, response): Promise<INodeExecutionData[]> => {
                    let bufferData = Buffer.from(items[0].json as unknown as ArrayBuffer);
                    const base64Data = bufferData.toString('base64');
                    return [{
                        binary: {
                            data: {
                                data: base64Data,
                                mimeType: response.headers['content-type'] as string,
                                fileSize: bufferData.length.toString(),
                                fileType: file_type(response.headers['content-type'] as string),
                            },
                        },
                        json: {},
                    }];
                }],
            }
        }
        let routing : INodePropertyRouting = {
            request: {
                // @ts-ignore
                method: method.toUpperCase(),
                url: `=${replacePathVarsToParameter(uri)}`,
            },
        };
        if (returns_raw_data) {
            routing.output = output;
            routing.request!.headers = {
              Accept: 'image/*',
            };
            routing.request!.json = false;
            routing.request!.encoding = 'arraybuffer';
        }
        const option = {
            name: parser.name(operation, context),
            value: parser.value(operation, context),
            action: parser.action(operation, context),
            description: parser.description(operation, context),
            routing,
        };
        const fields = this.parseFields(operation, context);
        return {
            option: option,
            fields: fields,
        };
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

