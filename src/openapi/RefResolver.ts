import {OpenAPIV3} from "openapi-types";

export class RefResolver {
    constructor(private doc: any) {

    }

    resolveRef(ref: string): OpenAPIV3.SchemaObject {
        const refPath = ref.split('/').slice(1);
        let schema: any = this.doc;
        for (const path of refPath) {
            // @ts-ignore
            schema = schema[path];
            if (!schema) {
                throw new Error(`Schema not found for ref '${ref}'`);
            }
        }
        if ('$ref' in schema) {
            return this.resolveRef(schema['$ref']);
        }
        return schema;
    }

    resolve(schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject): OpenAPIV3.SchemaObject {
        if ('$ref' in schema) {
            return this.resolveRef(schema['$ref']);
        }
        return schema
    }
}
