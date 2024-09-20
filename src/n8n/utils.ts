import * as lodash from "lodash";

export function toResourceName(name: string) {
    // keep only ascii, no emojis
    return lodash.startCase(name.replace(/[^a-zA-Z0-9]/g, ''))
}
