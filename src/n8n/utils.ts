/**
 * /api/entities/{entity} => /api/entities/{{$parameter["entity"]}}
 */
export function replacePathVarsToParameter(uri: string): string {
    return uri.replace(/{([^}]*)}/g, '{{$parameter["$1"]}}');
}
