import {OpenAPIV3} from "openapi-types";

export type OperationContext = {
    pattern: string,
    path: OpenAPIV3.PathItemObject,
    method: OpenAPIV3.HttpMethods,
}

export interface OpenAPIVisitor {
    visitDocument?(doc: OpenAPIV3.Document): void;

    visitOperation?(operation: OpenAPIV3.OperationObject, context: OperationContext): void;

    visitTag?(tag: OpenAPIV3.TagObject): void;

    finish?(): void;
}
