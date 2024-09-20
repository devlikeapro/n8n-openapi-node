import * as lodash from "lodash";

/**
 * Convert a string to a resource name
 * @param name
 */
export function toResourceName(name: string) {
    // keep only ascii, no emojis
    return lodash.startCase(name.replace(/[^a-zA-Z0-9]/g, ''))
}

/**
 * /api/entities/{entity} => /api/entities/{{$parameter["entity"]}}
 */
export function replacePathVarsToParameter(uri: string): string {
    return uri.replace(/{([^}]*)}/g, '{{$parameter["$1"]}}');
}
