import {N8NPropertiesBuilder} from "../src/N8NPropertiesBuilder";
import {INodeProperties} from "n8n-workflow";

test('petstore.json', () => {
    const doc = require('./samples/multioptions.json');
    const config = {}
    const parser = new N8NPropertiesBuilder(doc, config);
    const result = parser.build()

    console.log(JSON.stringify(result, null, 2))
    const expected: INodeProperties[] =     [
            {
                "displayName": "Resource",
                "name": "resource",
                "type": "options",
                "noDataExpression": true,
                "options": [
                    {
                        "name": "Default",
                        "value": "Default",
                        "description": ""
                    }
                ],
                "default": ""
            },
            {
                "displayName": "Operation",
                "name": "operation",
                "type": "options",
                "noDataExpression": true,
                "displayOptions": {
                    "show": {
                        "resource": [
                            "Default"
                        ]
                    }
                },
                "options": [
                    {
                        "name": "Create Model Fields Only",
                        "value": "Create Model Fields Only",
                        "action": "Create a model with field selection",
                        "description": "Create a model with field selection",
                        "routing": {
                            "request": {
                                "method": "POST",
                                "url": "=/model/"
                            }
                        }
                    }
                ],
                "default": ""
            },
            {
                "displayName": "POST /model/",
                "name": "operation",
                "type": "notice",
                "typeOptions": {
                    "theme": "info"
                },
                "default": "",
                "displayOptions": {
                    "show": {
                        "resource": [
                            "Default"
                        ],
                        "operation": [
                            "Create Model Fields Only"
                        ]
                    }
                }
            },
            {
                "displayName": "Fields Model",
                "name": "fields%5Bmodel%5D",
                "description": "Specifies which fields should be returned.",
                "default": [],
                "type": "multiOptions",
                "options": [
                    {
                        "name": "Component Type",
                        "value": "componentType"
                    },
                    {
                        "name": "Count",
                        "value": "count"
                    },
                    {
                        "name": "Array",
                        "value": "array"
                    },
                    {
                        "name": "Model Type",
                        "value": "modelType"
                    },
                    {
                        "name": "Sub Model",
                        "value": "subModel"
                    },
                    {
                        "name": "View",
                        "value": "view"
                    },
                    {
                        "name": "Name",
                        "value": "name"
                    }
                ],
                "routing": {
                    "send": {
                        "type": "query",
                        "property": "fields[model]",
                        "value": "={{ $value.join(',') }}",
                        "propertyInDotNotation": false
                    }
                },
                "displayOptions": {
                    "show": {
                        "resource": [
                            "Default"
                        ],
                        "operation": [
                            "Create Model Fields Only"
                        ]
                    }
                }
            }
        ]
    ;
    expect(result).toEqual(expected);
})