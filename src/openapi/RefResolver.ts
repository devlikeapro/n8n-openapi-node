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

    resolve<T>(schema: OpenAPIV3.ReferenceObject | T): T {
        // @ts-ignore
        if ("oneOf" in schema) {
            // @ts-ignore
            return this.resolve(schema.oneOf[0]);
        }
        // @ts-ignore
        if ("anyOf" in schema) {
            // @ts-ignore
            return this.resolve(schema.anyOf[0]);
        }
        // @ts-ignore
        if ("allOf" in schema) {
            // @ts-ignore
            const schemas = schema.allOf.map((s) => this.resolve(s));
            return Object.assign({}, ...schemas) as T;
        }
        // @ts-ignore
        if ('$ref' in schema) {
            const schemaResolved = this.resolveRef(schema['$ref']);
            // Remove $ref from schema, add all other properties
            const {$ref, ...rest} = schema;
            Object.assign(rest, schemaResolved);
            return rest as T
        }
        return schema as T
    }
}
