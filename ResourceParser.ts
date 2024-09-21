import {OpenAPIV3} from "openapi-types";
import * as lodash from "lodash";
import {toResourceName} from "./src/n8n/utils";

export interface IResourceParser {
    name(tag: OpenAPIV3.TagObject): string

    value(tag: Pick<OpenAPIV3.TagObject, "name">): string

    description(tag: OpenAPIV3.TagObject): string
}

export class DefaultResourceParser {
    name(tag: OpenAPIV3.TagObject): string {
        return lodash.startCase(tag.name);
    }

    value(tag: Pick<OpenAPIV3.TagObject, "name">): string {
        // TODO: use startCase by default
        return toResourceName(tag.name)
        // return lodash.startCase(tag.name);
    }

    description(tag: OpenAPIV3.TagObject): string {
        return tag.description || '';
    }
}
