import { Parser } from './parser';

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
				tags: ['🖥️ Tag'],
			},
		},
	};

	// @ts-ignore
	const parser = new Parser({ paths }, { addUriAfterOperation: true });
	const result = parser.parse('Entity', {
		uri: '/api/entities',
		method: 'get',
	});
	expect(result).toEqual([
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
				tags: ['🖥️ Tag'],
			},
		},
	};

	// @ts-ignore
	const parser = new Parser({ paths }, { addUriAfterOperation: false });

	const result = parser.parse('Entity', {
		uri: '/api/entities/{entity}',
		method: 'get',
	});
	expect(result).toEqual([
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
				tags: ['🖥️ Tag'],
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

	// @ts-ignore
	const parser = new Parser({ paths, components }, { addUriAfterOperation: false });

	const result = parser.parse('Entity', {
		uri: '/api/entities',
		method: 'post',
	});
	expect(result).toEqual([
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
			default: JSON.stringify({ foo: 'bar' }, null, 2),
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
				tags: ['🖥️ Tag'],
			},
		},
	};

	// @ts-ignore
	const parser = new Parser({ paths }, { addUriAfterOperation: false });

	const result = parser.parse('Entity', {
		uri: '/api/entities',
		method: 'post',
	});
	expect(result).toEqual([
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
