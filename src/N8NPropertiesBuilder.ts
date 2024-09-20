import {INodeProperties} from 'n8n-workflow';
import {OpenAPIV3} from 'openapi-types';
import pino from 'pino';
import {OpenAPIWalker} from "./openapi/OpenAPIWalker";
import {ResourcePropertiesCollector as ResourcePropertiesCollectorImpl} from "./ResourcePropertiesCollector";
import {BaseOperationsCollector, OperationsCollector as OperationsCollectorImpl} from "./OperationsCollector";
import * as lodash from "lodash";

export interface Override {
    find: any;
    replace: any;
}

export interface N8NPropertiesBuilderConfig {
    logger?: pino.Logger;
    overrides?: Override[];
    OperationsCollector?: typeof BaseOperationsCollector,
    ResourcePropertiesCollector?: typeof ResourcePropertiesCollectorImpl
}

export class N8NPropertiesBuilder {
    private readonly doc: OpenAPIV3.Document;
    private readonly logger: pino.Logger
    private readonly walker: OpenAPIWalker;
    private readonly overrides: Override[]

    // DI
    private readonly OperationsCollector: typeof BaseOperationsCollector;
    private readonly ResourcePropertiesCollector: typeof ResourcePropertiesCollectorImpl;

    constructor(doc: any, config?: N8NPropertiesBuilderConfig) {
        this.doc = doc
        this.logger = config?.logger || pino({transport: {target: 'pino-pretty'}})
        this.walker = new OpenAPIWalker(this.doc)
        this.OperationsCollector = config?.OperationsCollector ? config.OperationsCollector : OperationsCollectorImpl
        this.ResourcePropertiesCollector = config?.ResourcePropertiesCollector ? config.ResourcePropertiesCollector : ResourcePropertiesCollectorImpl
        this.overrides = config?.overrides || []
    }

    build(): INodeProperties[] {
        const resourcePropertiesCollector = new this.ResourcePropertiesCollector()
        this.walker.walk(resourcePropertiesCollector)
        const resourceNode = resourcePropertiesCollector.iNodeProperty

        const operationsCollector = new this.OperationsCollector(this.logger, this.doc)
        this.walker.walk(operationsCollector)
        const operations = operationsCollector.operations
        const fields = operationsCollector.fields

        const properties = [resourceNode, ...operations, ...fields]
        return this.update(properties, this.overrides)
    }

    private update(fields: any[], patterns: Override[]) {
        for (const pattern of patterns) {
            for (const element of lodash.filter(fields, pattern.find)) {
                Object.assign(element, pattern.replace);
            }
        }
        return fields
    }
}
