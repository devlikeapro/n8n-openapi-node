import {OpenAPIV3} from "openapi-types";
import * as lodash from "lodash";
import {OperationContext} from "./openapi/OpenAPIVisitor";
import {toResourceName} from "./n8n/utils";

export interface IOperationParser {
    getResources(operation: OpenAPIV3.OperationObject, context: OperationContext): string[]

    getOperationName(operation: OpenAPIV3.OperationObject, context: OperationContext): string

    getOptionAction(operation: OpenAPIV3.OperationObject, context: OperationContext): string

    getOptionDescription(operation: OpenAPIV3.OperationObject, context: OperationContext): string
}

export class N8NOperationParser implements IOperationParser {
    getResources(operation: OpenAPIV3.OperationObject, context: OperationContext): string[] {
        const tags = operation.tags;
        if (!tags || tags.length === 0) {
            // TODO: Add "default" tag
            throw new Error(`No tags found for operation '${operation}'`);
        }
        return tags.map(toResourceName)
    }

    getOperationName(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        let operationId: string = operation.operationId!!.split('_').slice(1).join('_');
        if (!operationId) {
            operationId = operation.operationId as string
        }
        return lodash.startCase(operationId)
    }

    getOptionAction(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        return operation.summary || this.getOperationName(operation, context)
    }

    getOptionDescription(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        return operation.description || operation.summary || '';
    }

}
