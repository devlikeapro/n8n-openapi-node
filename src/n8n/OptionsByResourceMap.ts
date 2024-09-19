import * as lodash from "lodash";

export class OptionsByResourceMap extends Map<string, any[]> {
    add(resource: string, option: any) {
        if (!this.has(resource)) {
            this.set(resource, []);
        }
        const options = this.get(resource)!!;
        if (lodash.find(options, {value: option.value})) {
            throw new Error(`Duplicate operation '${option.value}' for resource '${resource}'`);
        }
        options.push(option);
    }

}
