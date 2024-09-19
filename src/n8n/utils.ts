export function toResourceName(name: string) {
    // keep only ascii, no emojis
    return name.replace(/[^a-zA-Z0-9]/g, '');
}
