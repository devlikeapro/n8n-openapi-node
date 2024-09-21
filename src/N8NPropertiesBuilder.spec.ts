import {N8NPropertiesBuilder, Override} from './N8NPropertiesBuilder';

import {BaseOperationsCollector} from "./OperationsCollector";
import {OpenAPIV3} from "openapi-types";
import {OperationContext} from "./openapi/OpenAPIVisitor";
import * as lodash from "lodash";
import {DefaultOperationParser} from "./OperationParser";
import {DefaultResourceParser} from "./ResourceParser";

export class CustomOperationParser extends DefaultOperationParser {
    name(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        let operationId: string = operation.operationId!!.split('_').slice(1).join('_');
        if (!operationId) {
            operationId = operation.operationId as string
        }
        return lodash.startCase(operationId)
    }

    value(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        return this.name(operation, context)
    }

    action(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        return operation.summary || this.name(operation, context)
    }

    description(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        return operation.description || operation.summary || '';
    }
}

export class CustomResourceParser extends DefaultResourceParser {
    value(tag: OpenAPIV3.TagObject): string {
        return lodash.startCase(tag.name.replace(/[^a-zA-Z0-9_-]/g, ''));
    }
}

test('query param', () => {
    const paths = {
        '/api/entities': {
            get: {
                operationId: 'EntityController_list',
                summary: 'List all entities',
                parameters: [
                    {
                        name: 'all',
                        required: false,
                        in: 'query',
                        example: false,
                        description: 'Boolean flag description',
                        schema: {
                            type: 'boolean',
                        },
                    },
                ],
                tags: ['🖥️ Entity'],
            },
        },
    };

    const parser = new N8NPropertiesBuilder({paths}, {
        operation: new CustomOperationParser(),
        resource: new CustomResourceParser(),
    });
    const result = parser.build()

    expect(result).toEqual([
        {
            "default": "",
            "displayName": "Resource",
            "name": "resource",
            "noDataExpression": true,
            "options": [
                {
                    "description": "",
                    "name": "🖥️ Entity",
                    "value": "Entity"
                }
            ],
            "type": "options"
        },
        {
            displayName: 'Operation',
            name: 'operation',
            type: 'options',
            noDataExpression: true,
            displayOptions: {
                show: {
                    resource: ['Entity'],
                },
            },
            options: [
                {
                    name: 'List',
                    value: 'List',
                    action: 'List all entities',
                    description: 'List all entities',
                    routing: {
                        request: {
                            method: 'GET',
                            url: '=/api/entities',
                        },
                    },
                },
            ],
            // eslint-disable-next-line
            default: '',
        },
        {
            displayName: 'GET /api/entities',
            default: '',
            displayOptions: {
                show: {
                    operation: ['List'],
                    resource: ['Entity'],
                },
            },
            name: 'operation',
            type: 'notice',
            typeOptions: {
                theme: 'info',
            },
        },
        {
            displayName: 'All',
            name: 'all',
            type: 'boolean',
            displayOptions: {
                show: {
                    resource: ['Entity'],
                    operation: ['List'],
                },
            },
            default: false,
            // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
            description: 'Boolean flag description',
            routing: {
                request: {
                    qs: {
                        all: '={{ $value }}',
                    },
                },
            },
        },
    ]);
});

test('path param', () => {
    const paths = {
        '/api/entities/{entity}': {
            get: {
                operationId: 'EntityController_get',
                summary: 'Get entity',
                parameters: [
                    {
                        name: 'entity',
                        required: true,
                        in: 'path',
                        schema: {
                            default: 'default',
                        },
                        description: 'Entity <code>name</code>',
                    },
                ],
                tags: ['🖥️ Entity'],
            },
        },
    };

    const parser = new N8NPropertiesBuilder({paths}, {
        OperationsCollector: BaseOperationsCollector,
        operation: new CustomOperationParser(),
        resource: new CustomResourceParser(),
    });
    const result = parser.build()
    expect(result).toEqual([
        {
            "default": "",
            "displayName": "Resource",
            "name": "resource",
            "noDataExpression": true,
            "options": [
                {
                    "description": "",
                    "name": "🖥️ Entity",
                    "value": "Entity"
                }
            ],
            "type": "options"
        },
        {
            displayName: 'Operation',
            name: 'operation',
            type: 'options',
            noDataExpression: true,
            displayOptions: {
                show: {
                    resource: ['Entity'],
                },
            },
            options: [
                {
                    name: 'Get',
                    value: 'Get',
                    action: 'Get entity',
                    description: 'Get entity',
                    routing: {
                        request: {
                            method: 'GET',
                            url: '=/api/entities/{{$parameter["entity"]}}',
                        },
                    },
                },
            ],
            // eslint-disable-next-line
            default: '',
        },
        {
            displayName: 'Entity',
            name: 'entity',
            type: 'string',
            displayOptions: {
                show: {
                    resource: ['Entity'],
                    operation: ['Get'],
                },
            },
            default: 'default',
            required: true,
            description: 'Entity <code>name</code>',
        },
    ]);
});

test('request body', () => {
    const paths = {
        '/api/entities': {
            post: {
                operationId: 'EntityController_create',
                summary: 'Create entity',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Entity',
                            },
                        },
                    },
                },
                tags: ['🖥️ Entity'],
            },
        },
    };
    const components = {
        schemas: {
            Entity: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        maxLength: 54,
                        example: 'default',
                        description: 'Entity name',
                    },
                    start: {
                        type: 'boolean',
                        description: 'Boolean flag description',
                        example: true,
                        default: true,
                    },
                    config: {
                        $ref: '#/components/schemas/EntityConfig',
                    },
                },
                required: ['name'],
            },
            EntityConfig: {
                type: 'object',
                properties: {
                    foo: {
                        type: 'string',
                        example: 'bar',
                    },
                },
            },
        },
    };

    const parser = new N8NPropertiesBuilder({paths, components}, {
        OperationsCollector: BaseOperationsCollector,
        operation: new CustomOperationParser(),
        resource: new CustomResourceParser(),
    });
    const result = parser.build()

    expect(result).toEqual([
        {
            "default": "",
            "displayName": "Resource",
            "name": "resource",
            "noDataExpression": true,
            "options": [
                {
                    "description": "",
                    "name": "🖥️ Entity",
                    "value": "Entity"
                }
            ],
            "type": "options"
        },
        {
            displayName: 'Operation',
            name: 'operation',
            type: 'options',
            noDataExpression: true,
            displayOptions: {
                show: {
                    resource: ['Entity'],
                },
            },
            options: [
                {
                    name: 'Create',
                    value: 'Create',
                    action: 'Create entity',
                    description: 'Create entity',
                    routing: {
                        request: {
                            method: 'POST',
                            url: '=/api/entities',
                        },
                    },
                },
            ],
            // eslint-disable-next-line
            default: '',
        },
        {
            displayName: 'Name',
            name: 'name',
            type: 'string',
            default: 'default',
            description: 'Entity name',
            required: true,
            displayOptions: {
                show: {
                    resource: ['Entity'],
                    operation: ['Create'],
                },
            },
            routing: {
                request: {
                    body: {
                        name: '={{ $value }}',
                    },
                },
            },
        },
        {
            displayName: 'Start',
            name: 'start',
            type: 'boolean',
            default: true,
            required: undefined,
            // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
            description: 'Boolean flag description',
            displayOptions: {
                show: {
                    resource: ['Entity'],
                    operation: ['Create'],
                },
            },
            routing: {
                request: {
                    body: {
                        start: '={{ $value }}',
                    },
                },
            },
        },
        {
            displayName: 'Config',
            name: 'config',
            type: 'json',
            displayOptions: {
                show: {
                    resource: ['Entity'],
                    operation: ['Create'],
                },
            },
            default: JSON.stringify({foo: 'bar'}, null, 2),
            required: undefined,
            routing: {
                request: {
                    body: {
                        config: '={{ JSON.parse($value) }}',
                    },
                },
            },
        },
    ]);
});

test('enum schema', () => {
    const paths = {
        '/api/entities': {
            post: {
                operationId: 'EntityController_create',
                summary: 'Create entity',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: 'string',
                                        enum: ['type1', 'type2'],
                                    },
                                },
                                required: ['type'],
                            },
                        },
                    },
                },
                tags: ['🖥️ Entity'],
            },
        },
    };

    // @ts-ignore
    const parser = new N8NPropertiesBuilder({paths}, {
        OperationsCollector: BaseOperationsCollector,
        operation: new CustomOperationParser(),
        resource: new CustomResourceParser(),
    });
    const result = parser.build()

    expect(result).toEqual([
        {
            "default": "",
            "displayName": "Resource",
            "name": "resource",
            "noDataExpression": true,
            "options": [
                {
                    "description": "",
                    "name": "🖥️ Entity",
                    "value": "Entity"
                }
            ],
            "type": "options"
        },

        {
            displayName: 'Operation',
            name: 'operation',
            type: 'options',
            noDataExpression: true,
            displayOptions: {
                show: {
                    resource: ['Entity'],
                },
            },
            options: [
                {
                    name: 'Create',
                    value: 'Create',
                    action: 'Create entity',
                    description: 'Create entity',
                    routing: {
                        request: {
                            method: 'POST',
                            url: '=/api/entities',
                        },
                    },
                },
            ],
            // eslint-disable-next-line
            default: '',
        },
        {
            displayName: 'Type',
            name: 'type',
            type: 'options',
            default: 'type1',
            required: true,
            options: [
                {
                    name: 'Type 1',
                    value: 'type1',
                },
                {
                    name: 'Type 2',
                    value: 'type2',
                },
            ],
            displayOptions: {
                show: {
                    resource: ['Entity'],
                    operation: ['Create'],
                },
            },
            routing: {
                request: {
                    body: {
                        type: '={{ $value }}',
                    },
                },
            },
        },
    ]);
});

test('body "array" param', () => {
        const paths = {
            '/api/entities': {
                post: {
                    operationId: 'EntityController_create',
                    summary: 'Create entity',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                    tags: ['🖥️ Entity'],
                },
            },
        };

    const parser = new N8NPropertiesBuilder({paths}, {
        OperationsCollector: BaseOperationsCollector,
        operation: new CustomOperationParser(),
        resource: new CustomResourceParser(),
    });
    const result = parser.build()

    const expected: any[] = [
        {
            "default": "",
            "displayName": "Resource",
            "name": "resource",
            "noDataExpression": true,
            "options": [
                {
                    "description": "",
                    "name": "🖥️ Entity",
                    "value": "Entity"
                }
            ],
            "type": "options"
        },
        {
            "default": "",
            "displayName": "Operation",
            "displayOptions": {
                "show": {
                    "resource": [
                        "Entity"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Create entity",
                    "description": "Create entity",
                    "name": "Create",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/entities"
                        }
                    },
                    "value": "Create"
                }
            ],
            "type": "options"
        },
        {
            "default": "",
            "displayName": "Body",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create"
                    ],
                    "resource": [
                        "Entity"
                    ]
                }
            },
            "name": "body",
            "routing": {
                "request": {
                    "body": "={{ JSON.parse($value) }}"
                }
            },
            "type": "string"
        }
    ]
        expect(result).toEqual(expected)
    }
)

test('test overrides', () => {
    const paths = {
        '/api/entities': {
            post: {
                operationId: 'EntityController_create',
                summary: 'Create entity',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Entity',
                            },
                        },
                    },
                },
                tags: ['🖥️ Entity'],
            },
        },
    };
    const components = {
        schemas: {
            Entity: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        maxLength: 54,
                        example: 'default',
                        description: 'Entity name',
                    },
                    start: {
                        type: 'boolean',
                        description: 'Boolean flag description',
                        example: true,
                        default: true,
                    },
                    config: {
                        $ref: '#/components/schemas/EntityConfig',
                    },
                },
                required: ['name'],
            },
            EntityConfig: {
                type: 'object',
                properties: {
                    foo: {
                        type: 'string',
                        example: 'bar',
                    },
                },
            },
        },
    };

    const customDefaults: Override[] = [
        {
            find: {
                name: 'config',
                displayOptions: {
                    show: {
                        resource: ['Entity'],
                        operation: ['Create'],
                    },
                },
            },
            replace: {
                default: '={{ $json.config }}',
            },
        },
    ];

    const parser = new N8NPropertiesBuilder({paths, components}, {
        OperationsCollector: BaseOperationsCollector,
        operation: new CustomOperationParser(),
        resource: new CustomResourceParser(),
    });
    const result = parser.build(customDefaults)

    expect(result).toEqual([
        {
            "default": "",
            "displayName": "Resource",
            "name": "resource",
            "noDataExpression": true,
            "options": [
                {
                    "description": "",
                    "name": "🖥️ Entity",
                    "value": "Entity"
                }
            ],
            "type": "options"
        },
        {
            displayName: 'Operation',
            name: 'operation',
            type: 'options',
            noDataExpression: true,
            displayOptions: {
                show: {
                    resource: ['Entity'],
                },
            },
            options: [
                {
                    name: 'Create',
                    value: 'Create',
                    action: 'Create entity',
                    description: 'Create entity',
                    routing: {
                        request: {
                            method: 'POST',
                            url: '=/api/entities',
                        },
                    },
                },
            ],
            // eslint-disable-next-line
            default: '',
        },
        {
            displayName: 'Name',
            name: 'name',
            type: 'string',
            default: 'default',
            description: 'Entity name',
            required: true,
            displayOptions: {
                show: {
                    resource: ['Entity'],
                    operation: ['Create'],
                },
            },
            routing: {
                request: {
                    body: {
                        name: '={{ $value }}',
                    },
                },
            },
        },
        {
            displayName: 'Start',
            name: 'start',
            type: 'boolean',
            default: true,
            required: undefined,
            // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
            description: 'Boolean flag description',
            displayOptions: {
                show: {
                    resource: ['Entity'],
                    operation: ['Create'],
                },
            },
            routing: {
                request: {
                    body: {
                        start: '={{ $value }}',
                    },
                },
            },
        },
        {
            displayName: 'Config',
            name: 'config',
            type: 'json',
            displayOptions: {
                show: {
                    resource: ['Entity'],
                    operation: ['Create'],
                },
            },
            default: "={{ $json.config }}",
            required: undefined,
            routing: {
                request: {
                    body: {
                        config: '={{ JSON.parse($value) }}',
                    },
                },
            },
        },
    ]);
});

test('multiple tags', () => {
    const paths = {
        '/api/entities': {
            get: {
                operationId: 'EntityController_list',
                summary: 'List all entities',
                parameters: [
                    {
                        name: 'all',
                        required: false,
                        in: 'query',
                        example: false,
                        description: 'Boolean flag description',
                        schema: {
                            type: 'boolean',
                        },
                    },
                ],
                tags: [
                    '🖥️ Entity',
                    "Another Tag"
                ],
            },
        },
    };

    const parser = new N8NPropertiesBuilder({paths}, {
        operation: new CustomOperationParser(),
        resource: new CustomResourceParser(),
    })
    const result = parser.build()

    expect(result).toEqual(
        [
            {
                "default": "",
                "displayName": "Resource",
                "name": "resource",
                "noDataExpression": true,
                "options": [
                    {
                        "description": "",
                        "name": "🖥️ Entity",
                        "value": "Entity"
                    },
                    {
                        "description": "",
                        "name": "Another Tag",
                        "value": "Another Tag"
                    }
                ],
                "type": "options"
            },
            {
                "default": "",
                "displayName": "Operation",
                "displayOptions": {
                    "show": {
                        "resource": [
                            "Entity"
                        ]
                    }
                },
                "name": "operation",
                "noDataExpression": true,
                "options": [
                    {
                        "action": "List all entities",
                        "description": "List all entities",
                        "name": "List",
                        "routing": {
                            "request": {
                                "method": "GET",
                                "url": "=/api/entities"
                            }
                        },
                        "value": "List"
                    }
                ],
                "type": "options"
            },
            {
                "default": "",
                "displayName": "Operation",
                "displayOptions": {
                    "show": {
                        "resource": [
                            "Another Tag"
                        ]
                    }
                },
                "name": "operation",
                "noDataExpression": true,
                "options": [
                    {
                        "action": "List all entities",
                        "description": "List all entities",
                        "name": "List",
                        "routing": {
                            "request": {
                                "method": "GET",
                                "url": "=/api/entities"
                            }
                        },
                        "value": "List"
                    }
                ],
                "type": "options"
            },
            {
                "default": "",
                "displayName": "GET /api/entities",
                "displayOptions": {
                    "show": {
                        "operation": [
                            "List"
                        ],
                        "resource": [
                            "Entity"
                        ]
                    }
                },
                "name": "operation",
                "type": "notice",
                "typeOptions": {
                    "theme": "info"
                }
            },
            {
                "default": false,
                "description": "Boolean flag description",
                "displayName": "All",
                "displayOptions": {
                    "show": {
                        "operation": [
                            "List"
                        ],
                        "resource": [
                            "Entity"
                        ]
                    }
                },
                "name": "all",
                "routing": {
                    "request": {
                        "qs": {
                            "all": "={{ $value }}"
                        }
                    }
                },
                "type": "boolean"
            },
            {
                "default": "",
                "displayName": "GET /api/entities",
                "displayOptions": {
                    "show": {
                        "operation": [
                            "List"
                        ],
                        "resource": [
                            "Another Tag"
                        ]
                    }
                },
                "name": "operation",
                "type": "notice",
                "typeOptions": {
                    "theme": "info"
                }
            },
            {
                "default": false,
                "description": "Boolean flag description",
                "displayName": "All",
                "displayOptions": {
                    "show": {
                        "operation": [
                            "List"
                        ],
                        "resource": [
                            "Another Tag"
                        ]
                    }
                },
                "name": "all",
                "routing": {
                    "request": {
                        "qs": {
                            "all": "={{ $value }}"
                        }
                    }
                },
                "type": "boolean"
            }
        ]
    );
});

test('no tags - default tag', () => {
    const paths = {
        '/api/entities': {
            get: {
                operationId: 'EntityController_list',
                summary: 'List all entities',
                parameters: [
                    {
                        name: 'all',
                        required: false,
                        in: 'query',
                        example: false,
                        description: 'Boolean flag description',
                        schema: {
                            type: 'boolean',
                        },
                    },
                ],
                tags: [],
            },
        },
    };

    const parser = new N8NPropertiesBuilder({paths}, {
        operation: new CustomOperationParser(),
        resource: new CustomResourceParser(),
    });
    const result = parser.build()

    expect(result).toEqual(
        [
            {
                "default": "",
                "displayName": "Resource",
                "name": "resource",
                "noDataExpression": true,
                "options": [
                    {
                        "description": "",
                        "name": "Default",
                        "value": "Default"
                    }
                ],
                "type": "options"
            },
            {
                "default": "",
                "displayName": "Operation",
                "displayOptions": {
                    "show": {
                        "resource": [
                            "Default"
                        ]
                    }
                },
                "name": "operation",
                "noDataExpression": true,
                "options": [
                    {
                        "action": "List all entities",
                        "description": "List all entities",
                        "name": "List",
                        "routing": {
                            "request": {
                                "method": "GET",
                                "url": "=/api/entities"
                            }
                        },
                        "value": "List"
                    }
                ],
                "type": "options"
            },
            {
                "default": "",
                "displayName": "GET /api/entities",
                "displayOptions": {
                    "show": {
                        "operation": [
                            "List"
                        ],
                        "resource": [
                            "Default"
                        ]
                    }
                },
                "name": "operation",
                "type": "notice",
                "typeOptions": {
                    "theme": "info"
                }
            },
            {
                "default": false,
                "description": "Boolean flag description",
                "displayName": "All",
                "displayOptions": {
                    "show": {
                        "operation": [
                            "List"
                        ],
                        "resource": [
                            "Default"
                        ]
                    }
                },
                "name": "all",
                "routing": {
                    "request": {
                        "qs": {
                            "all": "={{ $value }}"
                        }
                    }
                },
                "type": "boolean"
            }
        ]
    );
});
