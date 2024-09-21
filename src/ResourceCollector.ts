import {OpenAPIVisitor, OperationContext} from "./openapi/OpenAPIVisitor";
import {OpenAPIV3} from "openapi-types";
import {INodeProperties} from "n8n-workflow";
import {IResourceParser} from "./ResourceParser";

interface TagObject {
    name: string;
    description: string;
}

/**
 * Collects resource properties from OpenAPI document
 * Resource is basically tags from OpenAPI spec
 */
export class ResourceCollector implements OpenAPIVisitor {
    private tags: Map<string, TagObject>;
    private tagsOrder = new Map<string, number>();

    constructor(protected resourceParser: IResourceParser) {
        this.tags = new Map<string, TagObject>()
    }

    get resources(): INodeProperties {
        const tags = this.sortedTags
        const parser = this.resourceParser
        const options = tags.map((tag) => {
            return {
                name: parser.name(tag),
                value: parser.value(tag),
                description: parser.description(tag),
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

    private get sortedTags() {
        const tags = Array.from(this.tags.values())
        tags.sort((a, b) => {
            return this.tagsOrder.get(a.name,)! - this.tagsOrder.get(b.name)!;
        })
        // put "default" at the end if not present explicitly in 'tags"
        if (!this.tagsOrder.has('default')) {
            const defaultTag = tags.find((tag) => tag.name === 'default')
            if (defaultTag) {
                tags.splice(tags.indexOf(defaultTag), 1)
                tags.push(defaultTag)
            }
        }
        return tags;
    }

    visitOperation(operation: OpenAPIV3.OperationObject, context: OperationContext) {
        let tags = operation.tags as string[]
        tags.forEach((tag) => this.addTagByName(tag))
    }

    private addTagByName(tag: string) {
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
        this.tagsOrder.set(name, this.tagsOrder.size);
    }
}
