import {OpenAPIV3} from "openapi-types";
import * as lodash from "lodash";

export class RefResolver {
    constructor(private doc: any) {

    }

    /**
     * Resolve ref and return it if found
     * @param schema
     */
    resolveRef<T>(schema: OpenAPIV3.ReferenceObject | T): [T, string[]?] {
        // @ts-ignore
        if ("oneOf" in schema) {
            // @ts-ignore
            schema = schema.oneOf[0]
        }
        // @ts-ignore
        if ("anyOf" in schema) {
            // @ts-ignore
            schema = schema.anyOf[0]
        }
        // @ts-ignore
        if ("allOf" in schema) {
            // @ts-ignore
            const results = schema.allOf.map((s) => this.resolveRef(s));
            const schemas = results.map((r: any) => r[0]);
            const refs = results.map((r: any) => r[1]);
            const refsFlat = lodash.flatten<string>(refs);
            const object = Object.assign({}, ...schemas);
            return [object as T, refsFlat]
        }
        // @ts-ignore
        if ('$ref' in schema) {
            const schemaResolved = this.findRef(schema['$ref']);
            // Remove $ref from schema, add all other properties
            const {$ref, ...rest} = schema;
            Object.assign(rest, schemaResolved);
            return [rest as T, [$ref]]
        }
        return [schema as T, undefined]
    }

    resolve<T>(schema: OpenAPIV3.ReferenceObject | T): T {
        return this.resolveRef(schema)[0]
    }

    private findRef(ref: string): OpenAPIV3.SchemaObject {
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
            return this.findRef(schema['$ref']);
        }
        return schema;
    }
}
