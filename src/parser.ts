import {INodeProperties} from 'n8n-workflow/dist/Interfaces';
import {OpenAPIV3} from 'openapi-types';
import pino from 'pino';
import {OpenAPIWalker} from "./openapi/OpenAPIWalker";
import {ResourcePropertiesCollector} from "./ResourcePropertiesCollector";
import {BaseOperationsCollector, OperationsCollector} from "./OperationsCollector";


export interface ParserConfig {
    logger?: pino.Logger;
    OperationsCollectorClass?: typeof BaseOperationsCollector,
    ResourcePropertiesCollectorClass?: typeof ResourcePropertiesCollector
}

export class Parser {
    private readonly doc: OpenAPIV3.Document;
    private readonly logger: pino.Logger
    private readonly walker: OpenAPIWalker;

    // DI
    private readonly OperationsCollectorClass: typeof BaseOperationsCollector;
    private readonly ResourcePropertiesCollectorClass: typeof ResourcePropertiesCollector;

    constructor(doc: any, config?: ParserConfig) {
        this.doc = doc
        this.logger = config?.logger || pino()
        this.walker = new OpenAPIWalker(this.doc)
        this.OperationsCollectorClass = config?.OperationsCollectorClass ? config.OperationsCollectorClass : OperationsCollector
        this.ResourcePropertiesCollectorClass = config?.ResourcePropertiesCollectorClass ? config.ResourcePropertiesCollectorClass : ResourcePropertiesCollector
    }

    process(): INodeProperties[] {
        const resourcePropertiesCollector = new this.ResourcePropertiesCollectorClass(this.logger)
        this.walker.walk(resourcePropertiesCollector)
        const resourceNode = resourcePropertiesCollector.iNodeProperty

        const operationsCollector = new this.OperationsCollectorClass(this.logger, this.doc)
        this.walker.walk(operationsCollector)
        const operations = operationsCollector.operations
        const fields = operationsCollector.fields

        return [resourceNode, ...operations, ...fields]
    }
}
