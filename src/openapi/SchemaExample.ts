import {RefResolver} from "./RefResolver";
import {OpenAPIV3} from "openapi-types";

export class SchemaExample {
    private resolver: RefResolver;

    constructor(doc: any) {
        this.resolver = new RefResolver(doc);
    }

    extractExample(schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject): any {
        schema = this.resolver.resolve(schema)
        if ('oneOf' in schema) {
            return this.extractExample(schema.oneOf!![0]);
        }
        if ('allOf' in schema) {
            const examples = schema.allOf!!.map((s) => this.extractExample(s));
            return Object.assign({}, ...examples);
        }
        if (schema.example !== undefined) {
            return schema.example;
        }
        if (schema.default !== undefined) {
            return schema.default;
        }
        if (schema.properties) {
            const obj: any = {};
            for (const key in schema.properties) {
                obj[key] = this.extractExample(schema.properties[key]);
            }
            return obj;
        }
        if ('items' in schema && schema.items) {
            return [this.extractExample(schema.items)];
        }
        return undefined;
    }
}
