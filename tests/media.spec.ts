import {N8NPropertiesBuilder} from '../src';
import {INodeProperties} from 'n8n-workflow';

test('image.json', async () => {
    const doc = require('./samples/image.json');
    const config = {};
    const parser = new N8NPropertiesBuilder(doc, config);
    const result = parser.build();

    // Ensure the post Receive is a function
    let postReceive = (result[1].options![0] as INodeProperties).routing!.output!.postReceive![0];
    expect(postReceive).toBeInstanceOf(Function);

    // @ts-ignore
    expect((await postReceive([{json: 'test'}], {
        headers: {
            'content-type': 'image/png'
        }
    }))[0].binary?.data.fileType).toBe('image');

    delete (result[1].options![0] as INodeProperties).routing!.output!.postReceive![0];
    expect(result).toEqual([
            {
                "displayName": "Resource",
                "name": "resource",
                "type": "options",
                "noDataExpression": true,
                "options": [
                    {
                        "name": "Example",
                        "value": "Example",
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
                            "Example"
                        ]
                    }
                },
                "options": [
                    {
                        "name": "Render Example By Id",
                        "value": "Render Example By Id",
                        "action": "Render the example by ID",
                        "description": "Renders something to a PNG image using the specified parameter and resolution.\nThis endpoint returns the rendered image as a PNG file.",
                        "routing": {
                            "request": {
                                "method": "GET",
                                "url": "=/example/{{$parameter[\"id\"]}}/render/{{$parameter[\"parameter\"]}}",
                                "headers": {
                                    "Accept": "image/*"
                                },
                                "json": false,
                                "encoding": "arraybuffer"
                            },
                            "output": {
                                "postReceive": []
                            }
                        }
                    }
                ],
                "default": ""
            },
            {
                "displayName": "GET /example/{id}/render/{parameter}",
                "name": "operation",
                "type": "notice",
                "typeOptions": {
                    "theme": "info"
                },
                "default": "",
                "displayOptions": {
                    "show": {
                        "resource": [
                            "Example"
                        ],
                        "operation": [
                            "Render Example By Id"
                        ]
                    }
                }
            },
            {
                "displayName": "Id",
                "name": "id",
                "required": true,
                "description": "The ID of the Example to render",
                "default": "",
                "type": "string",
                "displayOptions": {
                    "show": {
                        "resource": [
                            "Example"
                        ],
                        "operation": [
                            "Render Example By Id"
                        ]
                    }
                }
            },
            {
                "displayName": "Parameter",
                "name": "parameter",
                "required": true,
                "description": "Some parameter we want",
                "default": "",
                "type": "string",
                "displayOptions": {
                    "show": {
                        "resource": [
                            "Example"
                        ],
                        "operation": [
                            "Render Example By Id"
                        ]
                    }
                }
            },
            {
                "displayName": "Width",
                "name": "width",
                "default": 800,
                "type": "number",
                "routing": {
                    "send": {
                        "type": "query",
                        "property": "width",
                        "value": "={{ $value }}",
                        "propertyInDotNotation": false
                    }
                },
                "displayOptions": {
                    "show": {
                        "resource": [
                            "Example"
                        ],
                        "operation": [
                            "Render Example By Id"
                        ]
                    }
                }
            },
            {
                "displayName": "Height",
                "name": "height",
                "default": 600,
                "type": "number",
                "routing": {
                    "send": {
                        "type": "query",
                        "property": "height",
                        "value": "={{ $value }}",
                        "propertyInDotNotation": false
                    }
                },
                "displayOptions": {
                    "show": {
                        "resource": [
                            "Example"
                        ],
                        "operation": [
                            "Render Example By Id"
                        ]
                    }
                }
            }
        ]
    );
});

test('audio.json', async () => {
    const doc = require('./samples/audio.json');
    const config = {};
    const parser = new N8NPropertiesBuilder(doc, config);
    const result = parser.build();

    // Ensure the post Receive is a function
    let postReceive = (result[1].options![0] as INodeProperties).routing!.output!.postReceive![0];
    expect(postReceive).toBeInstanceOf(Function);

    // @ts-ignore
    expect((await postReceive([{json: 'test'}], {
        headers: {
            'content-type': 'audio/mpeg'
        }
    }))[0].binary?.data.fileType).toBe('audio');

    delete (result[1].options![0] as INodeProperties).routing!.output!.postReceive![0];

    expect(result).toEqual([{
            "displayName": "Resource",
            "name": "resource",
            "type": "options",
            "noDataExpression": true,
            "options": [{"name": "Default", "value": "Default", "description": ""}],
            "default": ""
        }, {
            "displayName": "Operation",
            "name": "operation",
            "type": "options",
            "noDataExpression": true,
            "displayOptions": {"show": {"resource": ["Default"]}},
            "options": [{
                "name": "Download Audio",
                "value": "Download Audio",
                "action": "Download MP3 Audio",
                "description": "Download MP3 Audio",
                "routing": {
                    "request": {
                        "method": "GET",
                        "url": "=/samples/audio/mp3/sample3.mp3",
                        "headers": {"Accept": "image/*"},
                        "json": false,
                        "encoding": "arraybuffer"
                    }, "output": {"postReceive": []}
                }
            }],
            "default": ""
        }, {
            "displayName": "GET /samples/audio/mp3/sample3.mp3",
            "name": "operation",
            "type": "notice",
            "typeOptions": {"theme": "info"},
            "default": "",
            "displayOptions": {
                "show": {
                    "resource": ["Default"],
                    "operation": ["Download Audio"]
                }
            }
        }]
    );
});

test('video.json', async () => {
    const doc = require('./samples/video.json');
    const config = {};
    const parser = new N8NPropertiesBuilder(doc, config);
    const result = parser.build();

    // Ensure the post Receive is a function
    let postReceive = (result[1].options![0] as INodeProperties).routing!.output!.postReceive![0];
    expect(postReceive).toBeInstanceOf(Function);

    // @ts-ignore
    expect((await postReceive([{json: 'test'}], {
        headers: {
            'content-type': 'video/mp4'
        }
    }))[0].binary?.data.fileType).toBe('video');

    delete (result[1].options![0] as INodeProperties).routing!.output!.postReceive![0];
    expect(result).toEqual([{
            "displayName": "Resource",
            "name": "resource",
            "type": "options",
            "noDataExpression": true,
            "options": [{"name": "Default", "value": "Default", "description": ""}],
            "default": ""
        }, {
            "displayName": "Operation",
            "name": "operation",
            "type": "options",
            "noDataExpression": true,
            "displayOptions": {"show": {"resource": ["Default"]}},
            "options": [{
                "name": "Download Video",
                "value": "Download Video",
                "action": "Download MP4 Video",
                "description": "Download MP4 Video",
                "routing": {
                    "request": {
                        "method": "GET",
                        "url": "=/samples/video/mp4/sample_640x360.mp4",
                        "headers": {"Accept": "image/*"},
                        "json": false,
                        "encoding": "arraybuffer"
                    }, "output": {"postReceive": []}
                }
            }],
            "default": ""
        }, {
            "displayName": "GET /samples/video/mp4/sample_640x360.mp4",
            "name": "operation",
            "type": "notice",
            "typeOptions": {"theme": "info"},
            "default": "",
            "displayOptions": {
                "show": {
                    "resource": ["Default"],
                    "operation": ["Download Video"]
                }
            }
        }]
    );
});

test('pdf.json', async () => {
    const doc = require('./samples/pdf.json');
    const config = {};
    const parser = new N8NPropertiesBuilder(doc, config);
    const result = parser.build();

    // Ensure the post Receive is a function
    let postReceive = (result[1].options![0] as INodeProperties).routing!.output!.postReceive![0];
    expect(postReceive).toBeInstanceOf(Function);

    // @ts-ignore
    expect((await postReceive([{json: 'test'}], {
        headers: {
            'content-type': 'application/pdf'
        }
    }))[0].binary?.data.fileType).toBe('pdf');

    delete (result[1].options![0] as INodeProperties).routing!.output!.postReceive![0];

    expect(result).toEqual([{
            "displayName": "Resource",
            "name": "resource",
            "type": "options",
            "noDataExpression": true,
            "options": [{"name": "Default", "value": "Default", "description": ""}],
            "default": ""
        }, {
            "displayName": "Operation",
            "name": "operation",
            "type": "options",
            "noDataExpression": true,
            "displayOptions": {"show": {"resource": ["Default"]}},
            "options": [{
                "name": "Download Audio",
                "value": "Download Audio",
                "action": "Download MP3 Audio",
                "description": "Download MP3 Audio",
                "routing": {
                    "request": {
                        "method": "GET",
                        "url": "=/storage/fed269b15c6809f599c9fce/2017/10/file-sample_150kB.pdf",
                        "headers": {"Accept": "image/*"},
                        "json": false,
                        "encoding": "arraybuffer"
                    }, "output": {"postReceive": []}
                }
            }],
            "default": ""
        }, {
            "displayName": "GET /storage/fed269b15c6809f599c9fce/2017/10/file-sample_150kB.pdf",
            "name": "operation",
            "type": "notice",
            "typeOptions": {"theme": "info"},
            "default": "",
            "displayOptions": {
                "show": {
                    "resource": ["Default"],
                    "operation": ["Download Audio"]
                }
            }
        }]
    );
});