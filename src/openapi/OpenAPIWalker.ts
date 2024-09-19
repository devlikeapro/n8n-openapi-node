import {OpenAPIV3} from "openapi-types";
import {OpenAPIVisitor} from "./OpenAPIVisitor";

const HttpMethods: string[] = Object.values(OpenAPIV3.HttpMethods);

export class OpenAPIWalker {
    private readonly doc: OpenAPIV3.Document

    constructor(doc: any) {
        this.doc = doc;

    }

    walk(visitor: OpenAPIVisitor) {
        this.walkDocument(visitor);
        this.walkPaths(visitor);
        this.walkTags(visitor);
    }

    private walkDocument(visitor: OpenAPIVisitor, doc?: OpenAPIV3.Document) {
        if (!doc) {
            doc = this.doc;
        }
        if (visitor.visitDocument) {
            visitor.visitDocument(doc)
        }
    }

    private walkPaths(visitor: OpenAPIVisitor, paths?: OpenAPIV3.PathsObject) {
        if (!paths) {
            paths = this.doc.paths;
        }
        if (!paths) {
            return;
        }
        for (const path in paths) {
            const pathItem: OpenAPIV3.PathItemObject = paths[path] as OpenAPIV3.PathItemObject;
            let method: string;
            let operation: any;
            for ([method, operation] of Object.entries(pathItem)) {
                if (!HttpMethods.includes(method)) {
                    continue;
                }
                if (operation && visitor.visitOperation) {
                    visitor.visitOperation(path, pathItem, method as OpenAPIV3.HttpMethods, operation);
                }
            }
        }
    }

    private walkTags(visitor: OpenAPIVisitor, tags?: OpenAPIV3.TagObject[]) {
        if (!tags) {
            tags = this.doc.tags;
        }
        if (!tags) {
            return;
        }
        if (!visitor.visitTag) {
            return;
        }
        for (const tag of tags) {
            visitor.visitTag(tag);
        }
    }
}
