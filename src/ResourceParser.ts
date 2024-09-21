import {OpenAPIV3} from "openapi-types";
import * as lodash from "lodash";

/**
 * Extract information for n8n node from OpenAPI resource
 */
export interface IResourceParser {
    /**
     * Name of the resource (e.g. "User")
     * @param tag
     */
    name(tag: OpenAPIV3.TagObject): string

    /**
     * Value of the resource (e.g. "user")
     * @note - will be used on operations as well, only "name" will be available for that
     */
    value(tag: Pick<OpenAPIV3.TagObject, "name">): string

    /**
     * Description of the resource
     * @param tag
     */
    description(tag: OpenAPIV3.TagObject): string
}

/**
 * Default behaviour for OpenAPI to n8n resource parser
 * It will use tag name as name and value and description as description
 */
export class DefaultResourceParser {
    name(tag: OpenAPIV3.TagObject): string {
        return lodash.startCase(tag.name);
    }

    value(tag: Pick<OpenAPIV3.TagObject, "name">): string {
        return lodash.startCase(tag.name)
    }

    description(tag: OpenAPIV3.TagObject): string {
        return tag.description || '';
    }
}
