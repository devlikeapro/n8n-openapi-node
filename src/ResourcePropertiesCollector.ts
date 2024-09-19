import {OpenAPIVisitor} from "./openapi/OpenAPIVisitor";
import pino from "pino";
import {OpenAPIV3} from "openapi-types";
import {INodeProperties} from "n8n-workflow/dist/Interfaces";

export function toResource(name: string) {
    // keep only ascii, no emojis
    return name.replace(/[^a-zA-Z0-9]/g, '');
}

interface TagObject {
    name: string;
    description: string;
}

/**
 * Collects resource properties from OpenAPI document
 */
export class ResourcePropertiesCollector implements OpenAPIVisitor {
    private tags: Map<string, TagObject>;

    constructor(private logger: pino.Logger) {
        this.logger = logger.child({class: 'ResourcePropertiesCollector'});
        this.tags = new Map<string, TagObject>()
    }

    get props(): INodeProperties {
        if (this.tags.size === 0) {
            throw new Error('No tags found in OpenAPI document')
        }

        const options = Array.from(this.tags.values()).map((tag) => {
            return {
                name: tag.name,
                value: toResource(tag.name),
                description: tag.description,
            };
        });
        return {
            displayName: 'Resource',
            name: 'resource',
            type: 'options',
            noDataExpression: true,
            options: options,
            default: '',
        };

    }

    visitOperation(path: OpenAPIV3.PathItemObject, method: OpenAPIV3.HttpMethods, operation: OpenAPIV3.OperationObject) {
        const tags = operation.tags;
        if (!tags || tags.length === 0) {
            this.logger.warn(`No tags found for operation '${operation}'`);
            return;
        }
        // get first tag
        const tag = tags[0];

        // insert if not found
        if (!this.tags.has(tag)) {
            this.tags.set(tag, {
                name: tag,
                description: '',
            });
        }
    }

    visitTag(tag: OpenAPIV3.TagObject): void {
        const name = tag.name;
        this.tags.set(name, {
            name: name,
            description: tag.description || '',
        });
    }
}
