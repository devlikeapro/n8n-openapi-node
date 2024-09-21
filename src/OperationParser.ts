import {OpenAPIV3} from "openapi-types";
import * as lodash from "lodash";
import {OperationContext} from "./openapi/OpenAPIVisitor";

export interface IOperationParser {
    name(operation: OpenAPIV3.OperationObject, context: OperationContext): string

    value(operation: OpenAPIV3.OperationObject, context: OperationContext): string

    action(operation: OpenAPIV3.OperationObject, context: OperationContext): string

    description(operation: OpenAPIV3.OperationObject, context: OperationContext): string
}

export class DefaultOperationParser implements IOperationParser {
    name(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        return lodash.startCase(operation.operationId)
    }

    value(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        return lodash.startCase(operation.operationId)
    }

    action(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        return operation.summary || this.name(operation, context)
    }

    description(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        return operation.description || operation.summary || '';
    }
}
