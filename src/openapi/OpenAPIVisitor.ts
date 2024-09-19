import {OpenAPIV3} from "openapi-types";


export interface OpenAPIVisitor {
    visitDocument?(doc: OpenAPIV3.Document): void;

    visitOperation?(path: OpenAPIV3.PathItemObject, method: OpenAPIV3.HttpMethods, operation: OpenAPIV3.OperationObject): void;

    visitTag?(tag: OpenAPIV3.TagObject): void;
}
