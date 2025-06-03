import { N8NPropertiesBuilder } from "../src/N8NPropertiesBuilder";
import { INodeProperties } from "n8n-workflow";

test('petstore.json', () => {
    const doc = require('./samples/petstore.json');
    const config = {}
    const parser = new N8NPropertiesBuilder(doc, config);
    const result = parser.build()

    const expected: INodeProperties[] = [
        {
            "default": "",
            "displayName": "Resource",
            "name": "resource",
            "noDataExpression": true,
            "options": [
                {
                    "description": "Everything about your Pets",
                    "name": "Pet",
                    "value": "Pet"
                },
                {
                    "description": "Access to Petstore orders",
                    "name": "Store",
                    "value": "Store"
                },
                {
                    "description": "Operations about user",
                    "name": "User",
                    "value": "User"
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
                        "Pet"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Update an existing pet",
                    "description": "Update an existing pet by Id",
                    "name": "Update Pet",
                    "routing": {
                        "request": {
                            "method": "PUT",
                            "url": "=/pet"
                        }
                    },
                    "value": "Update Pet"
                },
                {
                    "action": "Add a new pet to the store",
                    "description": "Add a new pet to the store",
                    "name": "Add Pet",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/pet"
                        }
                    },
                    "value": "Add Pet"
                },
                {
                    "action": "Finds Pets by status",
                    "description": "Multiple status values can be provided with comma separated strings",
                    "name": "Find Pets By Status",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/pet/findByStatus"
                        }
                    },
                    "value": "Find Pets By Status"
                },
                {
                    "action": "Finds Pets by tags",
                    "description": "Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.",
                    "name": "Find Pets By Tags",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/pet/findByTags"
                        }
                    },
                    "value": "Find Pets By Tags"
                },
                {
                    "action": "Find pet by ID",
                    "description": "Returns a single pet",
                    "name": "Get Pet By Id",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/pet/{{$parameter[\"petId\"]}}"
                        }
                    },
                    "value": "Get Pet By Id"
                },
                {
                    "action": "Updates a pet in the store with form data",
                    "description": "Updates a pet in the store with form data",
                    "name": "Update Pet With Form",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/pet/{{$parameter[\"petId\"]}}"
                        }
                    },
                    "value": "Update Pet With Form"
                },
                {
                    "action": "Deletes a pet",
                    "description": "Deletes a pet",
                    "name": "Delete Pet",
                    "routing": {
                        "request": {
                            "method": "DELETE",
                            "url": "=/pet/{{$parameter[\"petId\"]}}"
                        }
                    },
                    "value": "Delete Pet"
                },
                {
                    "action": "uploads an image",
                    "description": "uploads an image",
                    "name": "Upload File",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/pet/{{$parameter[\"petId\"]}}/uploadImage"
                        }
                    },
                    "value": "Upload File"
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
                        "Store"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Returns pet inventories by status",
                    "description": "Returns a map of status codes to quantities",
                    "name": "Get Inventory",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/store/inventory"
                        }
                    },
                    "value": "Get Inventory"
                },
                {
                    "action": "Place an order for a pet",
                    "description": "Place a new order in the store",
                    "name": "Place Order",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/store/order"
                        }
                    },
                    "value": "Place Order"
                },
                {
                    "action": "Find purchase order by ID",
                    "description": "For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.",
                    "name": "Get Order By Id",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/store/order/{{$parameter[\"orderId\"]}}"
                        }
                    },
                    "value": "Get Order By Id"
                },
                {
                    "action": "Delete purchase order by ID",
                    "description": "For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors",
                    "name": "Delete Order",
                    "routing": {
                        "request": {
                            "method": "DELETE",
                            "url": "=/store/order/{{$parameter[\"orderId\"]}}"
                        }
                    },
                    "value": "Delete Order"
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
                        "User"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Create user",
                    "description": "This can only be done by the logged in user.",
                    "name": "Create User",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/user"
                        }
                    },
                    "value": "Create User"
                },
                {
                    "action": "Creates list of users with given input array",
                    "description": "Creates list of users with given input array",
                    "name": "Create Users With List Input",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/user/createWithList"
                        }
                    },
                    "value": "Create Users With List Input"
                },
                {
                    "action": "Logs user into the system",
                    "description": "Logs user into the system",
                    "name": "Login User",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/user/login"
                        }
                    },
                    "value": "Login User"
                },
                {
                    "action": "Logs out current logged in user session",
                    "description": "Logs out current logged in user session",
                    "name": "Logout User",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/user/logout"
                        }
                    },
                    "value": "Logout User"
                },
                {
                    "action": "Get user by user name",
                    "description": "Get user by user name",
                    "name": "Get User By Name",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/user/{{$parameter[\"username\"]}}"
                        }
                    },
                    "value": "Get User By Name"
                },
                {
                    "action": "Update user",
                    "description": "This can only be done by the logged in user.",
                    "name": "Update User",
                    "routing": {
                        "request": {
                            "method": "PUT",
                            "url": "=/user/{{$parameter[\"username\"]}}"
                        }
                    },
                    "value": "Update User"
                },
                {
                    "action": "Delete user",
                    "description": "This can only be done by the logged in user.",
                    "name": "Delete User",
                    "routing": {
                        "request": {
                            "method": "DELETE",
                            "url": "=/user/{{$parameter[\"username\"]}}"
                        }
                    },
                    "value": "Delete User"
                }
            ],
            "type": "options"
        },
        {
            "default": "",
            "displayName": "PUT /pet",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update Pet"
                    ],
                    "resource": [
                        "Pet"
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
            "default": 10,
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "id",
            "routing": {
                "send": {
                    "property": "id",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "number"
        },
        {
            "default": "doggie",
            "displayName": "Name",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "name",
            "required": true,
            "routing": {
                "send": {
                    "property": "name",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "{\n  \"id\": 1,\n  \"name\": \"Dogs\"\n}",
            "displayName": "Category",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "category",
            "routing": {
                "send": {
                    "property": "category",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ JSON.parse($value) }}"
                }
            },
            "type": "json"
        },
        {
            "default": "[\n  null\n]",
            "displayName": "Photo Urls",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "photoUrls",
            "required": true,
            "routing": {
                "send": {
                    "property": "photoUrls",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ JSON.parse($value) }}"
                }
            },
            "type": "json"
        },
        {
            "default": "[\n  {}\n]",
            "displayName": "Tags",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "tags",
            "routing": {
                "send": {
                    "property": "tags",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ JSON.parse($value) }}"
                }
            },
            "type": "json"
        },
        {
            "default": "available",
            "description": "pet status in the store",
            "displayName": "Status",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "status",
            "options": [
                {
                    "name": "Available",
                    "value": "available"
                },
                {
                    "name": "Pending",
                    "value": "pending"
                },
                {
                    "name": "Sold",
                    "value": "sold"
                }
            ],
            "routing": {
                "send": {
                    "property": "status",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "options"
        },
        {
            "default": "",
            "displayName": "POST /pet",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Add Pet"
                    ],
                    "resource": [
                        "Pet"
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
            "default": 10,
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Add Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "id",
            "routing": {
                "send": {
                    "property": "id",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "number"
        },
        {
            "default": "doggie",
            "displayName": "Name",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Add Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "name",
            "required": true,
            "routing": {
                "send": {
                    "property": "name",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "{\n  \"id\": 1,\n  \"name\": \"Dogs\"\n}",
            "displayName": "Category",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Add Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "category",
            "routing": {
                "send": {
                    "property": "category",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ JSON.parse($value) }}"
                }
            },
            "type": "json"
        },
        {
            "default": "[\n  null\n]",
            "displayName": "Photo Urls",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Add Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "photoUrls",
            "required": true,
            "routing": {
                "send": {
                    "property": "photoUrls",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ JSON.parse($value) }}"
                }
            },
            "type": "json"
        },
        {
            "default": "[\n  {}\n]",
            "displayName": "Tags",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Add Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "tags",
            "routing": {
                "send": {
                    "property": "tags",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ JSON.parse($value) }}"
                }
            },
            "type": "json"
        },
        {
            "default": "available",
            "description": "pet status in the store",
            "displayName": "Status",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Add Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "status",
            "options": [
                {
                    "name": "Available",
                    "value": "available"
                },
                {
                    "name": "Pending",
                    "value": "pending"
                },
                {
                    "name": "Sold",
                    "value": "sold"
                }
            ],
            "routing": {
                "send": {
                    "property": "status",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "options"
        },
        {
            "default": "",
            "displayName": "GET /pet/findByStatus",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Find Pets By Status"
                    ],
                    "resource": [
                        "Pet"
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
            "default": "available",
            "description": "Status values that need to be considered for filter",
            "displayName": "Status",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Find Pets By Status"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "status",
            "options": [
                {
                    "name": "Available",
                    "value": "available"
                },
                {
                    "name": "Pending",
                    "value": "pending"
                },
                {
                    "name": "Sold",
                    "value": "sold"
                }
            ],
            "routing": {
                "send": {
                    "property": "status",
                    "propertyInDotNotation": false,
                    "type": "query",
                    "value": "={{ $value }}"
                }
            },
            "type": "options"
        },
        {
            "default": "",
            "displayName": "GET /pet/findByTags",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Find Pets By Tags"
                    ],
                    "resource": [
                        "Pet"
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
            "default": {
                "items": [
                    {
                        "value": undefined,
                    },
                ],
            },
            "description": "Tags to filter by",
            "displayName": "Tags",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Find Pets By Tags"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "tags",
            "options": [
                {
                    "displayName": "Items",
                    "name": "items",
                    "values": [
                        {
                            "default": "",
                            "description": "Item value (string)",
                            "displayName": "Value",
                            "name": "value",
                            "type": "string",
                        },
                    ],
                },
            ],
            "routing": {
                "send": {
                    "property": "tags",
                    "propertyInDotNotation": false,
                    "type": "query",
                    "value": "={{ $value.items ? $value.items.map(item => item.value) : [] }}"
                }
            },
            "type": "fixedCollection",
            "typeOptions": {
                "multipleValues": true,
            },
        },
        {
            "default": "",
            "displayName": "GET /pet/{petId}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Pet By Id"
                    ],
                    "resource": [
                        "Pet"
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
            "default": 0,
            "description": "ID of pet to return",
            "displayName": "Pet Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Pet By Id"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "petId",
            "required": true,
            "type": "number"
        },
        {
            "default": "",
            "displayName": "POST /pet/{petId}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update Pet With Form"
                    ],
                    "resource": [
                        "Pet"
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
            "default": 0,
            "description": "ID of pet that needs to be updated",
            "displayName": "Pet Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update Pet With Form"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "petId",
            "required": true,
            "type": "number"
        },
        {
            "default": "",
            "description": "Name of pet that needs to be updated",
            "displayName": "Name",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update Pet With Form"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "name",
            "routing": {
                "send": {
                    "property": "name",
                    "propertyInDotNotation": false,
                    "type": "query",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "description": "Status of pet that needs to be updated",
            "displayName": "Status",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update Pet With Form"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "status",
            "routing": {
                "send": {
                    "property": "status",
                    "propertyInDotNotation": false,
                    "type": "query",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "DELETE /pet/{petId}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Pet"
                    ],
                    "resource": [
                        "Pet"
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
            "default": "",
            "displayName": "Api Key",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "api_key",
            "routing": {
                "request": {
                    "headers": {
                        "api_key": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": 0,
            "description": "Pet id to delete",
            "displayName": "Pet Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Pet"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "petId",
            "required": true,
            "type": "number"
        },
        {
            "default": "",
            "displayName": "POST /pet/{petId}/uploadImage",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Upload File"
                    ],
                    "resource": [
                        "Pet"
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
            "default": 0,
            "description": "ID of pet to update",
            "displayName": "Pet Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Upload File"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "petId",
            "required": true,
            "type": "number"
        },
        {
            "default": "",
            "description": "Additional Metadata",
            "displayName": "Additional Metadata",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Upload File"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "additionalMetadata",
            "routing": {
                "send": {
                    "property": "additionalMetadata",
                    "propertyInDotNotation": false,
                    "type": "query",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /pet/{petId}/uploadImage<br/><br/>There's no body available for request, kindly use HTTP Request node to send body",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Upload File"
                    ],
                    "resource": [
                        "Pet"
                    ]
                }
            },
            "name": "operation",
            "type": "notice"
        },
        {
            "default": "",
            "displayName": "GET /store/inventory",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Inventory"
                    ],
                    "resource": [
                        "Store"
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
            "default": "",
            "displayName": "POST /store/order",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Place Order"
                    ],
                    "resource": [
                        "Store"
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
            "default": 10,
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Place Order"
                    ],
                    "resource": [
                        "Store"
                    ]
                }
            },
            "name": "id",
            "routing": {
                "send": {
                    "property": "id",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "number"
        },
        {
            "default": 198772,
            "displayName": "Pet Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Place Order"
                    ],
                    "resource": [
                        "Store"
                    ]
                }
            },
            "name": "petId",
            "routing": {
                "send": {
                    "property": "petId",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "number"
        },
        {
            "default": 7,
            "displayName": "Quantity",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Place Order"
                    ],
                    "resource": [
                        "Store"
                    ]
                }
            },
            "name": "quantity",
            "routing": {
                "send": {
                    "property": "quantity",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "number"
        },
        {
            "default": "",
            "displayName": "Ship Date",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Place Order"
                    ],
                    "resource": [
                        "Store"
                    ]
                }
            },
            "name": "shipDate",
            "routing": {
                "send": {
                    "property": "shipDate",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "approved",
            "description": "Order Status",
            "displayName": "Status",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Place Order"
                    ],
                    "resource": [
                        "Store"
                    ]
                }
            },
            "name": "status",
            "options": [
                {
                    "name": "Placed",
                    "value": "placed"
                },
                {
                    "name": "Approved",
                    "value": "approved"
                },
                {
                    "name": "Delivered",
                    "value": "delivered"
                }
            ],
            "routing": {
                "send": {
                    "property": "status",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "options"
        },
        {
            "default": true,
            "displayName": "Complete",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Place Order"
                    ],
                    "resource": [
                        "Store"
                    ]
                }
            },
            "name": "complete",
            "routing": {
                "send": {
                    "property": "complete",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "boolean"
        },
        {
            "default": "",
            "displayName": "GET /store/order/{orderId}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Order By Id"
                    ],
                    "resource": [
                        "Store"
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
            "default": 0,
            "description": "ID of order that needs to be fetched",
            "displayName": "Order Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Order By Id"
                    ],
                    "resource": [
                        "Store"
                    ]
                }
            },
            "name": "orderId",
            "required": true,
            "type": "number"
        },
        {
            "default": "",
            "displayName": "DELETE /store/order/{orderId}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Order"
                    ],
                    "resource": [
                        "Store"
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
            "default": 0,
            "description": "ID of the order that needs to be deleted",
            "displayName": "Order Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Order"
                    ],
                    "resource": [
                        "Store"
                    ]
                }
            },
            "name": "orderId",
            "required": true,
            "type": "number"
        },
        {
            "default": "",
            "displayName": "POST /user",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create User"
                    ],
                    "resource": [
                        "User"
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
            "default": 10,
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "id",
            "routing": {
                "send": {
                    "property": "id",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "number"
        },
        {
            "default": "theUser",
            "displayName": "Username",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "username",
            "routing": {
                "send": {
                    "property": "username",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "John",
            "displayName": "First Name",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "firstName",
            "routing": {
                "send": {
                    "property": "firstName",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "James",
            "displayName": "Last Name",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "lastName",
            "routing": {
                "send": {
                    "property": "lastName",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "john@email.com",
            "displayName": "Email",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "email",
            "routing": {
                "send": {
                    "property": "email",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "12345",
            "displayName": "Password",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "password",
            "routing": {
                "send": {
                    "property": "password",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "12345",
            "displayName": "Phone",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "phone",
            "routing": {
                "send": {
                    "property": "phone",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": 1,
            "description": "User Status",
            "displayName": "User Status",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "userStatus",
            "routing": {
                "send": {
                    "property": "userStatus",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "number"
        },
        {
            "default": "",
            "displayName": "POST /user/createWithList",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create Users With List Input"
                    ],
                    "resource": [
                        "User"
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
            "default": "{\n  \"id\": 10,\n  \"username\": \"theUser\",\n  \"firstName\": \"John\",\n  \"lastName\": \"James\",\n  \"email\": \"john@email.com\",\n  \"password\": \"12345\",\n  \"phone\": \"12345\",\n  \"userStatus\": 1\n}",
            "displayName": "Body",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create Users With List Input"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "body",
            "routing": {
                "request": {
                    "body": "={{ JSON.parse($value) }}"
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "GET /user/login",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Login User"
                    ],
                    "resource": [
                        "User"
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
            "default": "",
            "description": "The user name for login",
            "displayName": "Username",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Login User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "username",
            "routing": {
                "send": {
                    "property": "username",
                    "propertyInDotNotation": false,
                    "type": "query",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "description": "The password for login in clear text",
            "displayName": "Password",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Login User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "password",
            "routing": {
                "send": {
                    "property": "password",
                    "propertyInDotNotation": false,
                    "type": "query",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /user/logout",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Logout User"
                    ],
                    "resource": [
                        "User"
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
            "default": "",
            "displayName": "GET /user/{username}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get User By Name"
                    ],
                    "resource": [
                        "User"
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
            "default": "",
            "description": "The name that needs to be fetched. Use user1 for testing. ",
            "displayName": "Username",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get User By Name"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "username",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "PUT /user/{username}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update User"
                    ],
                    "resource": [
                        "User"
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
            "default": "",
            "description": "name that needs to be updated",
            "displayName": "Username",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "username",
            "required": true,
            "type": "string"
        },
        {
            "default": 10,
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "id",
            "routing": {
                "send": {
                    "property": "id",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "number"
        },
        {
            "default": "theUser",
            "displayName": "Username",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "username",
            "routing": {
                "send": {
                    "property": "username",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "John",
            "displayName": "First Name",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "firstName",
            "routing": {
                "send": {
                    "property": "firstName",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "James",
            "displayName": "Last Name",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "lastName",
            "routing": {
                "send": {
                    "property": "lastName",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "john@email.com",
            "displayName": "Email",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "email",
            "routing": {
                "send": {
                    "property": "email",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "12345",
            "displayName": "Password",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "password",
            "routing": {
                "send": {
                    "property": "password",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": "12345",
            "displayName": "Phone",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "phone",
            "routing": {
                "send": {
                    "property": "phone",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "string"
        },
        {
            "default": 1,
            "description": "User Status",
            "displayName": "User Status",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "userStatus",
            "routing": {
                "send": {
                    "property": "userStatus",
                    "propertyInDotNotation": false,
                    "type": "body",
                    "value": "={{ $value }}"
                }
            },
            "type": "number"
        },
        {
            "default": "",
            "displayName": "DELETE /user/{username}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete User"
                    ],
                    "resource": [
                        "User"
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
            "default": "",
            "description": "The name that needs to be deleted",
            "displayName": "Username",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete User"
                    ],
                    "resource": [
                        "User"
                    ]
                }
            },
            "name": "username",
            "required": true,
            "type": "string"
        }
    ]
    expect(result).toEqual(expected);
})
