import {N8NPropertiesBuilder, ParserConfig} from "../src/N8NPropertiesBuilder";
import {OperationsCollector} from "../src/OperationsCollector";
import {OpenAPIV3} from "openapi-types";
import {OperationContext} from "../src/openapi/OpenAPIVisitor";

function sessionFirst(a: any, b: any) {
    if (a.name === 'session') {
        return -1;
    }
    if (b.name === 'session') {
        return 1;
    }
    return 0;
}

export class WAHAOperationsCollector extends OperationsCollector {
    parseFields(operation: OpenAPIV3.OperationObject, context: OperationContext) {
        const fields = super.parseFields(operation, context);
        fields.sort(sessionFirst);
        return fields;
    }
}

test('waha.json', () => {
    const doc = require('./examples/waha.json');
    const config: ParserConfig = {
        OperationsCollector: WAHAOperationsCollector,
    }
    const parser = new N8NPropertiesBuilder(doc, config);
    const result = parser.build()

    const expected = [
        {
            "default": "",
            "displayName": "Resource",
            "name": "resource",
            "noDataExpression": true,
            "options": [
                {
                    "description": "Control WhatsApp sessions (accounts)",
                    "name": "🖥️ Sessions",
                    "value": "Sessions"
                },
                {
                    "description": "Authentication",
                    "name": "🔑 Auth",
                    "value": "Auth"
                },
                {
                    "description": "Get screenshot of WhatsApp and show QR code",
                    "name": "🖼️ Screenshot",
                    "value": "Screenshot"
                },
                {
                    "description": "Chatting methods",
                    "name": "📤 Chatting",
                    "value": "Chatting"
                },
                {
                    "description": "Channels (newsletters) methods",
                    "name": "📢 Channels",
                    "value": "Channels"
                },
                {
                    "description": "Status (aka stories) methods. <b>NOWEB</b> engine only!",
                    "name": "🟢 Status",
                    "value": "Status"
                },
                {
                    "description": "Chats methods",
                    "name": "💬 Chats",
                    "value": "Chats"
                },
                {
                    "description": "Contacts methods.<br>\n                Use phone number (without +) or phone number and `@c.us` at the end as `contactId`.<br>\n                'E.g: `12312312310` OR `12312312310@c.us`<br>",
                    "name": "👤 Contacts",
                    "value": "Contacts"
                },
                {
                    "description": "Groups methods.<br>",
                    "name": "👥 Groups",
                    "value": "Groups"
                },
                {
                    "description": "Presence information",
                    "name": "✅ Presence",
                    "value": "Presence"
                },
                {
                    "description": "Labels - available only for WhatsApp Business accounts",
                    "name": "🏷️ Labels",
                    "value": "Labels"
                },
                {
                    "description": "Other methods",
                    "name": "🔍 Observability",
                    "value": "Observability"
                },
                {
                    "description": "Storage methods",
                    "name": "🗄️ Storage",
                    "value": "Storage"
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
                        "Auth"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Get QR code for pairing WhatsApp API.",
                    "description": "Get QR code for pairing WhatsApp API.",
                    "name": "Get QR",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/auth/qr"
                        }
                    },
                    "value": "Get QR"
                },
                {
                    "action": "Request authentication code.",
                    "description": "Request authentication code.",
                    "name": "Request Code",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/auth/request-code"
                        }
                    },
                    "value": "Request Code"
                },
                {
                    "action": "Send OTP authentication code.",
                    "description": "Send OTP authentication code.",
                    "name": "Authorize Code",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/auth/authorize-code"
                        }
                    },
                    "value": "Authorize Code"
                },
                {
                    "action": "Get captcha image.",
                    "description": "Get captcha image.",
                    "name": "Get Captcha",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/auth/captcha"
                        }
                    },
                    "value": "Get Captcha"
                },
                {
                    "action": "Enter captcha code.",
                    "description": "Enter captcha code.",
                    "name": "Save Captcha",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/auth/captcha"
                        }
                    },
                    "value": "Save Captcha"
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
                        "Sessions"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "List all sessions",
                    "description": "List all sessions",
                    "name": "List",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/sessions"
                        }
                    },
                    "value": "List"
                },
                {
                    "action": "Create a session",
                    "description": "Create session a new session (and start it at the same time if required).",
                    "name": "Create",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sessions"
                        }
                    },
                    "value": "Create"
                },
                {
                    "action": "Get session information",
                    "description": "Get session information",
                    "name": "Get",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/sessions/{{$parameter[\"session\"]}}"
                        }
                    },
                    "value": "Get"
                },
                {
                    "action": "Update a session",
                    "description": "Update a session",
                    "name": "Update",
                    "routing": {
                        "request": {
                            "method": "PUT",
                            "url": "=/api/sessions/{{$parameter[\"session\"]}}"
                        }
                    },
                    "value": "Update"
                },
                {
                    "action": "Delete the session",
                    "description": "Delete the session with the given name. Stop and logout as well. Idempotent operation.",
                    "name": "Delete",
                    "routing": {
                        "request": {
                            "method": "DELETE",
                            "url": "=/api/sessions/{{$parameter[\"session\"]}}"
                        }
                    },
                    "value": "Delete"
                },
                {
                    "action": "Get information about the authenticated account",
                    "description": "Get information about the authenticated account",
                    "name": "Get Me",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/sessions/{{$parameter[\"session\"]}}/me"
                        }
                    },
                    "value": "Get Me"
                },
                {
                    "action": "Start the session",
                    "description": "Start the session with the given name. The session must exist. Identity operation.",
                    "name": "Start",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sessions/{{$parameter[\"session\"]}}/start"
                        }
                    },
                    "value": "Start"
                },
                {
                    "action": "Stop the session",
                    "description": "Stop the session with the given name. Idempotent operation.",
                    "name": "Stop",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sessions/{{$parameter[\"session\"]}}/stop"
                        }
                    },
                    "value": "Stop"
                },
                {
                    "action": "Logout from the session",
                    "description": "Logout the session, restart a session if it was not STOPPED",
                    "name": "Logout",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sessions/{{$parameter[\"session\"]}}/logout"
                        }
                    },
                    "value": "Logout"
                },
                {
                    "action": "Restart the session",
                    "description": "Restart the session with the given name.",
                    "name": "Restart",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sessions/{{$parameter[\"session\"]}}/restart"
                        }
                    },
                    "value": "Restart"
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
                        "Chatting"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Send a text message",
                    "description": "Send a text message",
                    "name": "Send Text",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sendText"
                        }
                    },
                    "value": "Send Text"
                },
                {
                    "action": "Send an image",
                    "description": "Either from an URL or base64 data - look at the request schemas for details.",
                    "name": "Send Image",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sendImage"
                        }
                    },
                    "value": "Send Image"
                },
                {
                    "action": "Send a file",
                    "description": "Either from an URL or base64 data - look at the request schemas for details.",
                    "name": "Send File",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sendFile"
                        }
                    },
                    "value": "Send File"
                },
                {
                    "action": "Send an voice message",
                    "description": "Either from an URL or base64 data - look at the request schemas for details.",
                    "name": "Send Voice",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sendVoice"
                        }
                    },
                    "value": "Send Voice"
                },
                {
                    "action": "Send a video",
                    "description": "Either from an URL or base64 data - look at the request schemas for details.",
                    "name": "Send Video",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sendVideo"
                        }
                    },
                    "value": "Send Video"
                },
                {
                    "action": "Send Seen",
                    "description": "",
                    "name": "Send Seen",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sendSeen"
                        }
                    },
                    "value": "Send Seen"
                },
                {
                    "action": "Start Typing",
                    "description": "",
                    "name": "Start Typing",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/startTyping"
                        }
                    },
                    "value": "Start Typing"
                },
                {
                    "action": "Stop Typing",
                    "description": "",
                    "name": "Stop Typing",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/stopTyping"
                        }
                    },
                    "value": "Stop Typing"
                },
                {
                    "action": "React to a message with an emoji",
                    "description": "React to a message with an emoji",
                    "name": "Set Reaction",
                    "routing": {
                        "request": {
                            "method": "PUT",
                            "url": "=/api/reaction"
                        }
                    },
                    "value": "Set Reaction"
                },
                {
                    "action": "Star or unstar a message",
                    "description": "Star or unstar a message",
                    "name": "Set Star",
                    "routing": {
                        "request": {
                            "method": "PUT",
                            "url": "=/api/star"
                        }
                    },
                    "value": "Set Star"
                },
                {
                    "action": "Send a poll with options",
                    "description": "You can use it as buttons or list replacement",
                    "name": "Send Poll",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sendPoll"
                        }
                    },
                    "value": "Send Poll"
                },
                {
                    "action": "Send Location",
                    "description": "",
                    "name": "Send Location",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sendLocation"
                        }
                    },
                    "value": "Send Location"
                },
                {
                    "action": "Send Link Preview",
                    "description": "",
                    "name": "Send Link Preview",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sendLinkPreview"
                        }
                    },
                    "value": "Send Link Preview"
                },
                {
                    "action": "Get messages in a chat",
                    "description": "Get messages in a chat",
                    "name": "Get Messages",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/messages"
                        }
                    },
                    "value": "Get Messages"
                },
                {
                    "action": "Send Contact Vcard",
                    "description": "",
                    "name": "Send Contact Vcard",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/sendContactVcard"
                        }
                    },
                    "value": "Send Contact Vcard"
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
                        "Chats"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Get chats",
                    "description": "Get chats",
                    "name": "Get Chats",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/chats"
                        }
                    },
                    "value": "Get Chats"
                },
                {
                    "action": "Deletes the chat",
                    "description": "Deletes the chat",
                    "name": "Delete Chat",
                    "routing": {
                        "request": {
                            "method": "DELETE",
                            "url": "=/api/{{$parameter[\"session\"]}}/chats/{{$parameter[\"chatId\"]}}"
                        }
                    },
                    "value": "Delete Chat"
                },
                {
                    "action": "Gets messages in the chat",
                    "description": "Gets messages in the chat",
                    "name": "Get Chat Messages",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/chats/{{$parameter[\"chatId\"]}}/messages"
                        }
                    },
                    "value": "Get Chat Messages"
                },
                {
                    "action": "Clears all messages from the chat",
                    "description": "Clears all messages from the chat",
                    "name": "Clear Messages",
                    "routing": {
                        "request": {
                            "method": "DELETE",
                            "url": "=/api/{{$parameter[\"session\"]}}/chats/{{$parameter[\"chatId\"]}}/messages"
                        }
                    },
                    "value": "Clear Messages"
                },
                {
                    "action": "Deletes a message from the chat",
                    "description": "Deletes a message from the chat",
                    "name": "Delete Message",
                    "routing": {
                        "request": {
                            "method": "DELETE",
                            "url": "=/api/{{$parameter[\"session\"]}}/chats/{{$parameter[\"chatId\"]}}/messages/{{$parameter[\"messageId\"]}}"
                        }
                    },
                    "value": "Delete Message"
                },
                {
                    "action": "Edits a message in the chat",
                    "description": "Edits a message in the chat",
                    "name": "Edit Message",
                    "routing": {
                        "request": {
                            "method": "PUT",
                            "url": "=/api/{{$parameter[\"session\"]}}/chats/{{$parameter[\"chatId\"]}}/messages/{{$parameter[\"messageId\"]}}"
                        }
                    },
                    "value": "Edit Message"
                },
                {
                    "action": "Archive the chat",
                    "description": "Archive the chat",
                    "name": "Archive Chat",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/chats/{{$parameter[\"chatId\"]}}/archive"
                        }
                    },
                    "value": "Archive Chat"
                },
                {
                    "action": "Unarchive the chat",
                    "description": "Unarchive the chat",
                    "name": "Unarchive Chat",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/chats/{{$parameter[\"chatId\"]}}/unarchive"
                        }
                    },
                    "value": "Unarchive Chat"
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
                        "Channels"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Get list of know channels",
                    "description": "Get list of know channels",
                    "name": "List",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/channels"
                        }
                    },
                    "value": "List"
                },
                {
                    "action": "Create a new channel.",
                    "description": "Create a new channel.",
                    "name": "Create",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/channels"
                        }
                    },
                    "value": "Create"
                },
                {
                    "action": "Delete the channel.",
                    "description": "Delete the channel.",
                    "name": "Delete",
                    "routing": {
                        "request": {
                            "method": "DELETE",
                            "url": "=/api/{{$parameter[\"session\"]}}/channels/{{$parameter[\"id\"]}}"
                        }
                    },
                    "value": "Delete"
                },
                {
                    "action": "Get the channel info",
                    "description": "You can use either id (123@newsletter) OR invite code (https://www.whatsapp.com/channel/123)",
                    "name": "Get",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/channels/{{$parameter[\"id\"]}}"
                        }
                    },
                    "value": "Get"
                },
                {
                    "action": "Follow the channel.",
                    "description": "Follow the channel.",
                    "name": "Follow",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/channels/follow"
                        }
                    },
                    "value": "Follow"
                },
                {
                    "action": "Unfollow the channel.",
                    "description": "Unfollow the channel.",
                    "name": "Unfollow",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/channels/unfollow"
                        }
                    },
                    "value": "Unfollow"
                },
                {
                    "action": "Mute the channel.",
                    "description": "Mute the channel.",
                    "name": "Mute",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/channels/mute"
                        }
                    },
                    "value": "Mute"
                },
                {
                    "action": "Unmute the channel.",
                    "description": "Unmute the channel.",
                    "name": "Unmute",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/channels/unmute"
                        }
                    },
                    "value": "Unmute"
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
                        "Status"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Send text status",
                    "description": "Send text status",
                    "name": "Send Text Status",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/status/text"
                        }
                    },
                    "value": "Send Text Status"
                },
                {
                    "action": "Send image status",
                    "description": "Send image status",
                    "name": "Send Image Status",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/status/image"
                        }
                    },
                    "value": "Send Image Status"
                },
                {
                    "action": "Send voice status",
                    "description": "Send voice status",
                    "name": "Send Voice Status",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/status/voice"
                        }
                    },
                    "value": "Send Voice Status"
                },
                {
                    "action": "Send video status",
                    "description": "Send video status",
                    "name": "Send Video Status",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/status/video"
                        }
                    },
                    "value": "Send Video Status"
                },
                {
                    "action": "DELETE sent status",
                    "description": "DELETE sent status",
                    "name": "Delete Status",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/status/delete"
                        }
                    },
                    "value": "Delete Status"
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
                        "Labels"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Get all labels",
                    "description": "Get all labels",
                    "name": "Get All",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/labels"
                        }
                    },
                    "value": "Get All"
                },
                {
                    "action": "Get labels for the chat",
                    "description": "Get labels for the chat",
                    "name": "Get Chat Labels",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/labels/chats/{{$parameter[\"chatId\"]}}"
                        }
                    },
                    "value": "Get Chat Labels"
                },
                {
                    "action": "Save labels for the chat",
                    "description": "Save labels for the chat",
                    "name": "Put Chat Labels",
                    "routing": {
                        "request": {
                            "method": "PUT",
                            "url": "=/api/{{$parameter[\"session\"]}}/labels/chats/{{$parameter[\"chatId\"]}}"
                        }
                    },
                    "value": "Put Chat Labels"
                },
                {
                    "action": "Get chats by label",
                    "description": "Get chats by label",
                    "name": "Get Chats By Label",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/labels/{{$parameter[\"labelId\"]}}/chats"
                        }
                    },
                    "value": "Get Chats By Label"
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
                        "Contacts"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Get contact basic info",
                    "description": "The method always return result, even if the phone number is not registered in WhatsApp. For that - use /contacts/check-exists endpoint below.",
                    "name": "Get",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/contacts"
                        }
                    },
                    "value": "Get"
                },
                {
                    "action": "Get all contacts",
                    "description": "Get all contacts",
                    "name": "Get All",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/contacts/all"
                        }
                    },
                    "value": "Get All"
                },
                {
                    "action": "Check phone number is registered in WhatsApp.",
                    "description": "Check phone number is registered in WhatsApp.",
                    "name": "Check Exists",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/contacts/check-exists"
                        }
                    },
                    "value": "Check Exists"
                },
                {
                    "action": "Gets the Contact's \"about\" info",
                    "description": "Returns null if you do not have permission to read their status.",
                    "name": "Get About",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/contacts/about"
                        }
                    },
                    "value": "Get About"
                },
                {
                    "action": "Get contact's profile picture URL",
                    "description": "If privacy settings do not allow to get the picture, the method will return null.",
                    "name": "Get Profile Picture",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/contacts/profile-picture"
                        }
                    },
                    "value": "Get Profile Picture"
                },
                {
                    "action": "Block contact",
                    "description": "Block contact",
                    "name": "Block",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/contacts/block"
                        }
                    },
                    "value": "Block"
                },
                {
                    "action": "Unblock contact",
                    "description": "Unblock contact",
                    "name": "Unblock",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/contacts/unblock"
                        }
                    },
                    "value": "Unblock"
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
                        "Groups"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Create a new group.",
                    "description": "Create a new group.",
                    "name": "Create Group",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups"
                        }
                    },
                    "value": "Create Group"
                },
                {
                    "action": "Get all groups.",
                    "description": "Get all groups.",
                    "name": "Get Groups",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups"
                        }
                    },
                    "value": "Get Groups"
                },
                {
                    "action": "Get the group.",
                    "description": "Get the group.",
                    "name": "Get Group",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}"
                        }
                    },
                    "value": "Get Group"
                },
                {
                    "action": "Delete the group.",
                    "description": "Delete the group.",
                    "name": "Delete Group",
                    "routing": {
                        "request": {
                            "method": "DELETE",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}"
                        }
                    },
                    "value": "Delete Group"
                },
                {
                    "action": "Updates the group \"info admin only\" settings.",
                    "description": "You can allow only admins to edit group info (title, description, photo).",
                    "name": "Set Info Admin Only",
                    "routing": {
                        "request": {
                            "method": "PUT",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/settings/security/info-admin-only"
                        }
                    },
                    "value": "Set Info Admin Only"
                },
                {
                    "action": "Get the group's 'info admin only' settings.",
                    "description": "You can allow only admins to edit group info (title, description, photo).",
                    "name": "Get Info Admin Only",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/settings/security/info-admin-only"
                        }
                    },
                    "value": "Get Info Admin Only"
                },
                {
                    "action": "Update settings - who can send messages",
                    "description": "Updates the group settings to only allow admins to send messages.",
                    "name": "Set Messages Admin Only",
                    "routing": {
                        "request": {
                            "method": "PUT",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/settings/security/messages-admin-only"
                        }
                    },
                    "value": "Set Messages Admin Only"
                },
                {
                    "action": "Get settings - who can send messages",
                    "description": "The group settings to only allow admins to send messages.",
                    "name": "Get Messages Admin Only",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/settings/security/messages-admin-only"
                        }
                    },
                    "value": "Get Messages Admin Only"
                },
                {
                    "action": "Leave the group.",
                    "description": "Leave the group.",
                    "name": "Leave Group",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/leave"
                        }
                    },
                    "value": "Leave Group"
                },
                {
                    "action": "Updates the group description.",
                    "description": "Returns \"true\" if the subject was properly updated. This can return \"false\" if the user does not have the necessary permissions.",
                    "name": "Set Description",
                    "routing": {
                        "request": {
                            "method": "PUT",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/description"
                        }
                    },
                    "value": "Set Description"
                },
                {
                    "action": "Updates the group subject",
                    "description": "Returns \"true\" if the subject was properly updated. This can return \"false\" if the user does not have the necessary permissions.",
                    "name": "Set Subject",
                    "routing": {
                        "request": {
                            "method": "PUT",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/subject"
                        }
                    },
                    "value": "Set Subject"
                },
                {
                    "action": "Gets the invite code for the group.",
                    "description": "Gets the invite code for the group.",
                    "name": "Get Invite Code",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/invite-code"
                        }
                    },
                    "value": "Get Invite Code"
                },
                {
                    "action": "Invalidates the current group invite code and generates a new one.",
                    "description": "Invalidates the current group invite code and generates a new one.",
                    "name": "Revoke Invite Code",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/invite-code/revoke"
                        }
                    },
                    "value": "Revoke Invite Code"
                },
                {
                    "action": "Get participants",
                    "description": "Get participants",
                    "name": "Get Participants",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/participants"
                        }
                    },
                    "value": "Get Participants"
                },
                {
                    "action": "Add participants",
                    "description": "Add participants",
                    "name": "Add Participants",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/participants/add"
                        }
                    },
                    "value": "Add Participants"
                },
                {
                    "action": "Remove participants",
                    "description": "Remove participants",
                    "name": "Remove Participants",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/participants/remove"
                        }
                    },
                    "value": "Remove Participants"
                },
                {
                    "action": "Promote participants to admin users.",
                    "description": "Promote participants to admin users.",
                    "name": "Promote To Admin",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/admin/promote"
                        }
                    },
                    "value": "Promote To Admin"
                },
                {
                    "action": "Demotes participants to regular users.",
                    "description": "Demotes participants to regular users.",
                    "name": "Demote To Admin",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/groups/{{$parameter[\"id\"]}}/admin/demote"
                        }
                    },
                    "value": "Demote To Admin"
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
                        "Presence"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Set session presence",
                    "description": "Set session presence",
                    "name": "Set Presence",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/presence"
                        }
                    },
                    "value": "Set Presence"
                },
                {
                    "action": "Get all subscribed presence information.",
                    "description": "Get all subscribed presence information.",
                    "name": "Get Presence All",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/presence"
                        }
                    },
                    "value": "Get Presence All"
                },
                {
                    "action": "Get the presence for the chat id. If it hasn't been subscribed - it also subscribes to it.",
                    "description": "Get the presence for the chat id. If it hasn't been subscribed - it also subscribes to it.",
                    "name": "Get Presence",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/{{$parameter[\"session\"]}}/presence/{{$parameter[\"chatId\"]}}"
                        }
                    },
                    "value": "Get Presence"
                },
                {
                    "action": "Subscribe to presence events for the chat.",
                    "description": "Subscribe to presence events for the chat.",
                    "name": "Subscribe",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/{{$parameter[\"session\"]}}/presence/{{$parameter[\"chatId\"]}}/subscribe"
                        }
                    },
                    "value": "Subscribe"
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
                        "Screenshot"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Screenshot",
                    "description": "",
                    "name": "Screenshot",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/screenshot"
                        }
                    },
                    "value": "Screenshot"
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
                        "Observability"
                    ]
                }
            },
            "name": "operation",
            "noDataExpression": true,
            "options": [
                {
                    "action": "Ping the server",
                    "description": "Check if the server is alive and responding to requests.",
                    "name": "Ping",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/ping"
                        }
                    },
                    "value": "Ping"
                },
                {
                    "action": "Check the health of the server",
                    "description": "Perform all health checks and return the server's health status.",
                    "name": "Check",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/health"
                        }
                    },
                    "value": "Check"
                },
                {
                    "action": "Get the version of the server",
                    "description": "Get the version of the server",
                    "name": "Get",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/server/version"
                        }
                    },
                    "value": "Get"
                },
                {
                    "action": "Get the server environment",
                    "description": "Get the server environment",
                    "name": "Environment",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/server/environment"
                        }
                    },
                    "value": "Environment"
                },
                {
                    "action": "Get the server status",
                    "description": "Get the server status",
                    "name": "Status",
                    "routing": {
                        "request": {
                            "method": "GET",
                            "url": "=/api/server/status"
                        }
                    },
                    "value": "Status"
                },
                {
                    "action": "Stop (and restart) the server",
                    "description": "If you're using docker, after calling this endpoint Docker will start a new container, so you can use this endpoint to restart the server",
                    "name": "Stop",
                    "routing": {
                        "request": {
                            "method": "POST",
                            "url": "=/api/server/stop"
                        }
                    },
                    "value": "Stop"
                }
            ],
            "type": "options"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/auth/qr",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get QR"
                    ],
                    "resource": [
                        "Auth"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get QR"
                    ],
                    "resource": [
                        "Auth"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "image",
            "displayName": "Format",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get QR"
                    ],
                    "resource": [
                        "Auth"
                    ]
                }
            },
            "name": "format",
            "options": [
                {
                    "name": "Image",
                    "value": "image"
                },
                {
                    "name": "Raw",
                    "value": "raw"
                }
            ],
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "format": "={{ $value }}"
                    }
                }
            },
            "type": "options"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/auth/request-code",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Request Code"
                    ],
                    "resource": [
                        "Auth"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Request Code"
                    ],
                    "resource": [
                        "Auth"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "12132132130",
            "description": "Mobile phone number in international format",
            "displayName": "Phone Number",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Request Code"
                    ],
                    "resource": [
                        "Auth"
                    ]
                }
            },
            "name": "phoneNumber",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "phoneNumber": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": null,
            "description": "How would you like to receive the one time code for registration? |sms|voice. Leave empty for Web pairing.",
            "displayName": "Method",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Request Code"
                    ],
                    "resource": [
                        "Auth"
                    ]
                }
            },
            "name": "method",
            "routing": {
                "request": {
                    "body": {
                        "method": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/auth/authorize-code",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Authorize Code"
                    ],
                    "resource": [
                        "Auth"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Authorize Code"
                    ],
                    "resource": [
                        "Auth"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "Code",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Authorize Code"
                    ],
                    "resource": [
                        "Auth"
                    ]
                }
            },
            "name": "code",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "code": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/auth/captcha",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Captcha"
                    ],
                    "resource": [
                        "Auth"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Captcha"
                    ],
                    "resource": [
                        "Auth"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/auth/captcha",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Save Captcha"
                    ],
                    "resource": [
                        "Auth"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Save Captcha"
                    ],
                    "resource": [
                        "Auth"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "Code",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Save Captcha"
                    ],
                    "resource": [
                        "Auth"
                    ]
                }
            },
            "name": "code",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "code": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/sessions",
            "displayOptions": {
                "show": {
                    "operation": [
                        "List"
                    ],
                    "resource": [
                        "Sessions"
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
            "description": "Return all sessions, including those that are in the STOPPED state.",
            "displayName": "All",
            "displayOptions": {
                "show": {
                    "operation": [
                        "List"
                    ],
                    "resource": [
                        "Sessions"
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
            "displayName": "POST /api/sessions",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create"
                    ],
                    "resource": [
                        "Sessions"
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
            "default": "default",
            "description": "Session name (id)",
            "displayName": "Name",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create"
                    ],
                    "resource": [
                        "Sessions"
                    ]
                }
            },
            "name": "name",
            "routing": {
                "request": {
                    "body": {
                        "name": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": true,
            "description": "Start session after creation",
            "displayName": "Start",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create"
                    ],
                    "resource": [
                        "Sessions"
                    ]
                }
            },
            "name": "start",
            "routing": {
                "request": {
                    "body": {
                        "start": "={{ $value }}"
                    }
                }
            },
            "type": "boolean"
        },
        {
            "default": "{\n  \"metadata\": {},\n  \"proxy\": {\n    \"server\": \"localhost:3128\",\n    \"username\": null,\n    \"password\": null\n  },\n  \"debug\": false,\n  \"noweb\": {\n    \"store\": {\n      \"enabled\": true,\n      \"fullSync\": false\n    }\n  },\n  \"webhooks\": [\n    {\n      \"url\": \"https://webhook.site/11111111-1111-1111-1111-11111111\",\n      \"events\": [\n        \"message\",\n        \"session.status\"\n      ],\n      \"hmac\": {\n        \"key\": \"your-secret-key\"\n      },\n      \"retries\": {\n        \"delaySeconds\": 2,\n        \"attempts\": 15\n      },\n      \"customHeaders\": null\n    }\n  ]\n}",
            "displayName": "Config",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create"
                    ],
                    "resource": [
                        "Sessions"
                    ]
                }
            },
            "name": "config",
            "routing": {
                "request": {
                    "body": {
                        "config": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "GET /api/sessions/{session}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get"
                    ],
                    "resource": [
                        "Sessions"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get"
                    ],
                    "resource": [
                        "Sessions"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "PUT /api/sessions/{session}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update"
                    ],
                    "resource": [
                        "Sessions"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update"
                    ],
                    "resource": [
                        "Sessions"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "{\n  \"metadata\": {},\n  \"proxy\": {\n    \"server\": \"localhost:3128\",\n    \"username\": null,\n    \"password\": null\n  },\n  \"debug\": false,\n  \"noweb\": {\n    \"store\": {\n      \"enabled\": true,\n      \"fullSync\": false\n    }\n  },\n  \"webhooks\": [\n    {\n      \"url\": \"https://webhook.site/11111111-1111-1111-1111-11111111\",\n      \"events\": [\n        \"message\",\n        \"session.status\"\n      ],\n      \"hmac\": {\n        \"key\": \"your-secret-key\"\n      },\n      \"retries\": {\n        \"delaySeconds\": 2,\n        \"attempts\": 15\n      },\n      \"customHeaders\": null\n    }\n  ]\n}",
            "displayName": "Config",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Update"
                    ],
                    "resource": [
                        "Sessions"
                    ]
                }
            },
            "name": "config",
            "routing": {
                "request": {
                    "body": {
                        "config": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "DELETE /api/sessions/{session}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete"
                    ],
                    "resource": [
                        "Sessions"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete"
                    ],
                    "resource": [
                        "Sessions"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/sessions/{session}/me",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Me"
                    ],
                    "resource": [
                        "Sessions"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Me"
                    ],
                    "resource": [
                        "Sessions"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/sessions/{session}/start",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Start"
                    ],
                    "resource": [
                        "Sessions"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Start"
                    ],
                    "resource": [
                        "Sessions"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/sessions/{session}/stop",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Stop"
                    ],
                    "resource": [
                        "Sessions"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Stop"
                    ],
                    "resource": [
                        "Sessions"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/sessions/{session}/logout",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Logout"
                    ],
                    "resource": [
                        "Sessions"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Logout"
                    ],
                    "resource": [
                        "Sessions"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/sessions/{session}/restart",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Restart"
                    ],
                    "resource": [
                        "Sessions"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Restart"
                    ],
                    "resource": [
                        "Sessions"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/sendText",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Text"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Text"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Text"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": null,
            "description": "The ID of the message to reply to - false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
            "displayName": "Reply To",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Text"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "reply_to",
            "routing": {
                "request": {
                    "body": {
                        "reply_to": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "Hi there!",
            "displayName": "Text",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Text"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "text",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "text": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/sendImage",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Image"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Image"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Image"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "{\n  \"mimetype\": \"image/jpeg\",\n  \"filename\": \"filename.jpg\",\n  \"url\": \"https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg\"\n}",
            "displayName": "File",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Image"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "file",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "file": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": null,
            "description": "The ID of the message to reply to - false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
            "displayName": "Reply To",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Image"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "reply_to",
            "routing": {
                "request": {
                    "body": {
                        "reply_to": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "Caption",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Image"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "caption",
            "routing": {
                "request": {
                    "body": {
                        "caption": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/sendFile",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send File"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send File"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send File"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "{\n  \"mimetype\": \"image/jpeg\",\n  \"filename\": \"filename.jpg\",\n  \"url\": \"https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg\"\n}",
            "displayName": "File",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send File"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "file",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "file": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": null,
            "description": "The ID of the message to reply to - false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
            "displayName": "Reply To",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send File"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "reply_to",
            "routing": {
                "request": {
                    "body": {
                        "reply_to": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "Caption",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send File"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "caption",
            "routing": {
                "request": {
                    "body": {
                        "caption": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/sendVoice",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Voice"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Voice"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Voice"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "{\n  \"mimetype\": \"audio/ogg; codecs=opus\",\n  \"url\": \"https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.opus\"\n}",
            "displayName": "File",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Voice"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "file",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "file": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": null,
            "description": "The ID of the message to reply to - false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
            "displayName": "Reply To",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Voice"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "reply_to",
            "routing": {
                "request": {
                    "body": {
                        "reply_to": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/sendVideo",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Video"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Video"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Video"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "{\n  \"mimetype\": \"video/mp4\",\n  \"filename\": \"video.mp4\",\n  \"url\": \"https://github.com/devlikeapro/waha/raw/core/examples/video.mp4\"\n}",
            "displayName": "File",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Video"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "file",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "file": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": null,
            "description": "The ID of the message to reply to - false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
            "displayName": "Reply To",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Video"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "reply_to",
            "routing": {
                "request": {
                    "body": {
                        "reply_to": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "Just watch at this!",
            "displayName": "Caption",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Video"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "caption",
            "routing": {
                "request": {
                    "body": {
                        "caption": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/sendSeen",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Seen"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Seen"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Seen"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
            "description": "NOWEB engine only - it's important to mark ALL messages as seen",
            "displayName": "Message Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Seen"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "messageId",
            "routing": {
                "request": {
                    "body": {
                        "messageId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "description": "NOWEB engine only - the ID of the user that sent the  message (undefined for individual chats)",
            "displayName": "Participant",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Seen"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "participant",
            "routing": {
                "request": {
                    "body": {
                        "participant": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/startTyping",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Start Typing"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Start Typing"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Start Typing"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/stopTyping",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Stop Typing"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Stop Typing"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Stop Typing"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "PUT /api/reaction",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Reaction"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Reaction"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
            "displayName": "Message Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Reaction"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "messageId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "messageId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "👍",
            "description": "Emoji to react with. Send an empty string to remove the reaction",
            "displayName": "Reaction",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Reaction"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "reaction",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "reaction": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "PUT /api/star",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Star"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Star"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
            "displayName": "Message Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Star"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "messageId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "messageId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Star"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": true,
            "displayName": "Star",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Star"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "star",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "star": "={{ $value }}"
                    }
                }
            },
            "type": "boolean"
        },
        {
            "default": "",
            "displayName": "POST /api/sendPoll",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Poll"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Poll"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Poll"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": null,
            "description": "The ID of the message to reply to - false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
            "displayName": "Reply To",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Poll"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "reply_to",
            "routing": {
                "request": {
                    "body": {
                        "reply_to": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "{\n  \"name\": \"How are you?\",\n  \"options\": [\n    \"Awesome!\",\n    \"Good!\",\n    \"Not bad!\"\n  ],\n  \"multipleAnswers\": false\n}",
            "displayName": "Poll",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Poll"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "poll",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "poll": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "POST /api/sendLocation",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Location"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Location"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Location"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": 38.8937255,
            "displayName": "Latitude",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Location"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "latitude",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "latitude": "={{ $value }}"
                    }
                }
            },
            "type": "number"
        },
        {
            "default": -77.0969763,
            "displayName": "Longitude",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Location"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "longitude",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "longitude": "={{ $value }}"
                    }
                }
            },
            "type": "number"
        },
        {
            "default": "Our office",
            "displayName": "Title",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Location"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "title",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "title": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": null,
            "description": "The ID of the message to reply to - false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
            "displayName": "Reply To",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Location"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "reply_to",
            "routing": {
                "request": {
                    "body": {
                        "reply_to": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/sendLinkPreview",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Link Preview"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Link Preview"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Link Preview"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "Url",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Link Preview"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "url",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "url": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "Title",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Link Preview"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "title",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "title": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/messages",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Messages"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Messages"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Messages"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": true,
            "description": "Download media for messages",
            "displayName": "Download Media",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Messages"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "downloadMedia",
            "routing": {
                "request": {
                    "qs": {
                        "downloadMedia": "={{ $value }}"
                    }
                }
            },
            "type": "boolean"
        },
        {
            "default": 0,
            "displayName": "Limit",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Messages"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "limit",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "limit": "={{ $value }}"
                    }
                }
            },
            "type": "number"
        },
        {
            "default": "",
            "displayName": "POST /api/sendContactVcard",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Contact Vcard"
                    ],
                    "resource": [
                        "Chatting"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Contact Vcard"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Contact Vcard"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "[\n  {\n    \"vcard\": \"BEGIN:VCARD\\nVERSION:3.0\\nFN:Jane Doe\\nORG:Company Name;\\nTEL;type=CELL;type=VOICE;waid=911111111111:+91 11111 11111\\nEND:VCARD\"\n  }\n]",
            "displayName": "Contacts",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Contact Vcard"
                    ],
                    "resource": [
                        "Chatting"
                    ]
                }
            },
            "name": "contacts",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "contacts": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/chats",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chats"
                    ],
                    "resource": [
                        "Chats"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chats"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": 0,
            "displayName": "Limit",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chats"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "limit",
            "routing": {
                "request": {
                    "qs": {
                        "limit": "={{ $value }}"
                    }
                }
            },
            "type": "number"
        },
        {
            "default": 0,
            "displayName": "Offset",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chats"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "offset",
            "routing": {
                "request": {
                    "qs": {
                        "offset": "={{ $value }}"
                    }
                }
            },
            "type": "number"
        },
        {
            "default": "",
            "displayName": "DELETE /api/{session}/chats/{chatId}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Chat"
                    ],
                    "resource": [
                        "Chats"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Chat"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123456789@c.us",
            "description": "Chat ID",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Chat"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/chats/{chatId}/messages",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chat Messages"
                    ],
                    "resource": [
                        "Chats"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chat Messages"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": true,
            "description": "Download media for messages",
            "displayName": "Download Media",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chat Messages"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "downloadMedia",
            "routing": {
                "request": {
                    "qs": {
                        "downloadMedia": "={{ $value }}"
                    }
                }
            },
            "type": "boolean"
        },
        {
            "default": 100,
            "displayName": "Limit",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chat Messages"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "limit",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "limit": "={{ $value }}"
                    }
                }
            },
            "type": "number"
        },
        {
            "default": "123456789@c.us",
            "description": "Chat ID",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chat Messages"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "DELETE /api/{session}/chats/{chatId}/messages",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Clear Messages"
                    ],
                    "resource": [
                        "Chats"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Clear Messages"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123456789@c.us",
            "description": "Chat ID",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Clear Messages"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "DELETE /api/{session}/chats/{chatId}/messages/{messageId}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Message"
                    ],
                    "resource": [
                        "Chats"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Message"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123456789@c.us",
            "description": "Chat ID",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Message"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "type": "string"
        },
        {
            "default": "true_123456789@c.us_BAE6A33293978B16",
            "description": "Message ID",
            "displayName": "Message Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Message"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "messageId",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "PUT /api/{session}/chats/{chatId}/messages/{messageId}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Edit Message"
                    ],
                    "resource": [
                        "Chats"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Edit Message"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123456789@c.us",
            "description": "Chat ID",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Edit Message"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "type": "string"
        },
        {
            "default": "true_123456789@c.us_BAE6A33293978B16",
            "description": "Message ID",
            "displayName": "Message Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Edit Message"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "messageId",
            "required": true,
            "type": "string"
        },
        {
            "default": "Hello, world!",
            "displayName": "Text",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Edit Message"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "text",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "text": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/chats/{chatId}/archive",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Archive Chat"
                    ],
                    "resource": [
                        "Chats"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Archive Chat"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123456789@c.us",
            "description": "Chat ID",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Archive Chat"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/chats/{chatId}/unarchive",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Unarchive Chat"
                    ],
                    "resource": [
                        "Chats"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Unarchive Chat"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123456789@c.us",
            "description": "Chat ID",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Unarchive Chat"
                    ],
                    "resource": [
                        "Chats"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/channels",
            "displayOptions": {
                "show": {
                    "operation": [
                        "List"
                    ],
                    "resource": [
                        "Channels"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "List"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "OWNER",
            "displayName": "Role",
            "displayOptions": {
                "show": {
                    "operation": [
                        "List"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "role",
            "options": [
                {
                    "name": "OWNER",
                    "value": "OWNER"
                },
                {
                    "name": "ADMIN",
                    "value": "ADMIN"
                },
                {
                    "name": "SUBSCRIBER",
                    "value": "SUBSCRIBER"
                }
            ],
            "routing": {
                "request": {
                    "qs": {
                        "role": "={{ $value }}"
                    }
                }
            },
            "type": "options"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/channels",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create"
                    ],
                    "resource": [
                        "Channels"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "Channel Name",
            "displayName": "Name",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "name",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "name": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "Channel Description",
            "displayName": "Description",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "description",
            "routing": {
                "request": {
                    "body": {
                        "description": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "{\n  \"mimetype\": \"image/jpeg\",\n  \"filename\": \"filename.jpg\",\n  \"url\": \"https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg\"\n}",
            "displayName": "Picture",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "picture",
            "routing": {
                "request": {
                    "body": {
                        "picture": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "DELETE /api/{session}/channels/{id}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete"
                    ],
                    "resource": [
                        "Channels"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@newsletter",
            "description": "WhatsApp Channel ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/channels/{id}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get"
                    ],
                    "resource": [
                        "Channels"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@newsletter",
            "description": "WhatsApp Channel ID or invite code from invite link https://www.whatsapp.com/channel/11111",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/channels/follow",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Follow"
                    ],
                    "resource": [
                        "Channels"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Follow"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@newsletter",
            "description": "WhatsApp Channel ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Follow"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/channels/unfollow",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Unfollow"
                    ],
                    "resource": [
                        "Channels"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Unfollow"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@newsletter",
            "description": "WhatsApp Channel ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Unfollow"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/channels/mute",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Mute"
                    ],
                    "resource": [
                        "Channels"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Mute"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@newsletter",
            "description": "WhatsApp Channel ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Mute"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/channels/unmute",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Unmute"
                    ],
                    "resource": [
                        "Channels"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Unmute"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@newsletter",
            "description": "WhatsApp Channel ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Unmute"
                    ],
                    "resource": [
                        "Channels"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/status/text",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Text Status"
                    ],
                    "resource": [
                        "Status"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Text Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "[\n  \"55xxxxxxxxxxx@c.us\"\n]",
            "description": "it is always necessary to inform the list of contacts that will have access to the posted status",
            "displayName": "Contacts",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Text Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "contacts",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "contacts": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "Have a look! https://github.com/",
            "displayName": "Text",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Text Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "text",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "text": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "#38b42f",
            "displayName": "Background Color",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Text Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "backgroundColor",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "backgroundColor": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": 1,
            "displayName": "Font",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Text Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "font",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "font": "={{ $value }}"
                    }
                }
            },
            "type": "number"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/status/image",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Image Status"
                    ],
                    "resource": [
                        "Status"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Image Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "[\n  \"55xxxxxxxxxxx@c.us\"\n]",
            "description": "it is always necessary to inform the list of contacts that will have access to the posted status",
            "displayName": "Contacts",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Image Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "contacts",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "contacts": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "{\n  \"mimetype\": \"image/jpeg\",\n  \"filename\": \"filename.jpg\",\n  \"url\": \"https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg\"\n}",
            "displayName": "File",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Image Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "file",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "file": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "Caption",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Image Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "caption",
            "routing": {
                "request": {
                    "body": {
                        "caption": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/status/voice",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Voice Status"
                    ],
                    "resource": [
                        "Status"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Voice Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "[\n  \"55xxxxxxxxxxx@c.us\"\n]",
            "description": "it is always necessary to inform the list of contacts that will have access to the posted status",
            "displayName": "Contacts",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Voice Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "contacts",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "contacts": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "{\n  \"mimetype\": \"audio/ogg; codecs=opus\",\n  \"url\": \"https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.opus\"\n}",
            "displayName": "File",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Voice Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "file",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "file": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "#38b42f",
            "displayName": "Background Color",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Voice Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "backgroundColor",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "backgroundColor": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/status/video",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Video Status"
                    ],
                    "resource": [
                        "Status"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Video Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "[\n  \"55xxxxxxxxxxx@c.us\"\n]",
            "description": "it is always necessary to inform the list of contacts that will have access to the posted status",
            "displayName": "Contacts",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Video Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "contacts",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "contacts": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "{\n  \"mimetype\": \"video/mp4\",\n  \"filename\": \"video.mp4\",\n  \"url\": \"https://github.com/devlikeapro/waha/raw/core/examples/video.mp4\"\n}",
            "displayName": "File",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Video Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "file",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "file": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "Caption",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Send Video Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "caption",
            "routing": {
                "request": {
                    "body": {
                        "caption": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/status/delete",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Status"
                    ],
                    "resource": [
                        "Status"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "[\n  \"55xxxxxxxxxxx@c.us\"\n]",
            "description": "it is always necessary to inform the list of contacts that will have access to the posted status",
            "displayName": "Contacts",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "contacts",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "contacts": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "AAAAAAAAAAAAAAAAA",
            "description": "status message id",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Status"
                    ],
                    "resource": [
                        "Status"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "id": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/labels",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get All"
                    ],
                    "resource": [
                        "Labels"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get All"
                    ],
                    "resource": [
                        "Labels"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/labels/chats/{chatId}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chat Labels"
                    ],
                    "resource": [
                        "Labels"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chat Labels"
                    ],
                    "resource": [
                        "Labels"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123456789@c.us",
            "description": "Chat ID",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chat Labels"
                    ],
                    "resource": [
                        "Labels"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "PUT /api/{session}/labels/chats/{chatId}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Put Chat Labels"
                    ],
                    "resource": [
                        "Labels"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Put Chat Labels"
                    ],
                    "resource": [
                        "Labels"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123456789@c.us",
            "description": "Chat ID",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Put Chat Labels"
                    ],
                    "resource": [
                        "Labels"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "type": "string"
        },
        {
            "default": "[\n  {\n    \"id\": \"1\"\n  }\n]",
            "displayName": "Labels",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Put Chat Labels"
                    ],
                    "resource": [
                        "Labels"
                    ]
                }
            },
            "name": "labels",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "labels": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/labels/{labelId}/chats",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chats By Label"
                    ],
                    "resource": [
                        "Labels"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chats By Label"
                    ],
                    "resource": [
                        "Labels"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "Label Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Chats By Label"
                    ],
                    "resource": [
                        "Labels"
                    ]
                }
            },
            "name": "labelId",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/contacts",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get"
                    ],
                    "resource": [
                        "Contacts"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Contact Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "contactId",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "contactId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/contacts/all",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get All"
                    ],
                    "resource": [
                        "Contacts"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get All"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/contacts/check-exists",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Check Exists"
                    ],
                    "resource": [
                        "Contacts"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Check Exists"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "1213213213",
            "description": "The phone number to check",
            "displayName": "Phone",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Check Exists"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "phone",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "phone": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/contacts/about",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get About"
                    ],
                    "resource": [
                        "Contacts"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get About"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Contact Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get About"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "contactId",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "contactId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/contacts/profile-picture",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Profile Picture"
                    ],
                    "resource": [
                        "Contacts"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Profile Picture"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Contact Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Profile Picture"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "contactId",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "contactId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/contacts/block",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Block"
                    ],
                    "resource": [
                        "Contacts"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Block"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Contact Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Block"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "contactId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "contactId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/contacts/unblock",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Unblock"
                    ],
                    "resource": [
                        "Contacts"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Unblock"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "displayName": "Contact Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Unblock"
                    ],
                    "resource": [
                        "Contacts"
                    ]
                }
            },
            "name": "contactId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "contactId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/groups",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create Group"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create Group"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "Name",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create Group"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "name",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "name": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "[\n  {\n    \"id\": \"123456789@c.us\"\n  }\n]",
            "displayName": "Participants",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Create Group"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "participants",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "participants": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/groups",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Groups"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Groups"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/groups/{id}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Group"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Group"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Group"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "DELETE /api/{session}/groups/{id}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Group"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Group"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Delete Group"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "PUT /api/{session}/groups/{id}/settings/security/info-admin-only",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Info Admin Only"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Info Admin Only"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Info Admin Only"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": true,
            "displayName": "Admins Only",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Info Admin Only"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "adminsOnly",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "adminsOnly": "={{ $value }}"
                    }
                }
            },
            "type": "boolean"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/groups/{id}/settings/security/info-admin-only",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Info Admin Only"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Info Admin Only"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Info Admin Only"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "PUT /api/{session}/groups/{id}/settings/security/messages-admin-only",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Messages Admin Only"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Messages Admin Only"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Messages Admin Only"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": true,
            "displayName": "Admins Only",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Messages Admin Only"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "adminsOnly",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "adminsOnly": "={{ $value }}"
                    }
                }
            },
            "type": "boolean"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/groups/{id}/settings/security/messages-admin-only",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Messages Admin Only"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Messages Admin Only"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Messages Admin Only"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/groups/{id}/leave",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Leave Group"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Leave Group"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Leave Group"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "PUT /api/{session}/groups/{id}/description",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Description"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Description"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Description"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "Description",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Description"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "description",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "description": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "PUT /api/{session}/groups/{id}/subject",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Subject"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Subject"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Subject"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "Subject",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Subject"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "subject",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "subject": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/groups/{id}/invite-code",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Invite Code"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Invite Code"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Invite Code"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/groups/{id}/invite-code/revoke",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Revoke Invite Code"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Revoke Invite Code"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Revoke Invite Code"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/groups/{id}/participants",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Participants"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Participants"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Participants"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/groups/{id}/participants/add",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Add Participants"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Add Participants"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Add Participants"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "[\n  {\n    \"id\": \"123456789@c.us\"\n  }\n]",
            "displayName": "Participants",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Add Participants"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "participants",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "participants": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/groups/{id}/participants/remove",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Remove Participants"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Remove Participants"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Remove Participants"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "[\n  {\n    \"id\": \"123456789@c.us\"\n  }\n]",
            "displayName": "Participants",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Remove Participants"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "participants",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "participants": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/groups/{id}/admin/promote",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Promote To Admin"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Promote To Admin"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Promote To Admin"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "[\n  {\n    \"id\": \"123456789@c.us\"\n  }\n]",
            "displayName": "Participants",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Promote To Admin"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "participants",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "participants": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/groups/{id}/admin/demote",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Demote To Admin"
                    ],
                    "resource": [
                        "Groups"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Demote To Admin"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123123123@g.us",
            "description": "Group ID",
            "displayName": "Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Demote To Admin"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "id",
            "required": true,
            "type": "string"
        },
        {
            "default": "[\n  {\n    \"id\": \"123456789@c.us\"\n  }\n]",
            "displayName": "Participants",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Demote To Admin"
                    ],
                    "resource": [
                        "Groups"
                    ]
                }
            },
            "name": "participants",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "participants": "={{ JSON.parse($value) }}"
                    }
                }
            },
            "type": "json"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/presence",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Presence"
                    ],
                    "resource": [
                        "Presence"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Presence"
                    ],
                    "resource": [
                        "Presence"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "11111111111@c.us",
            "description": "Chat ID - either group id or contact id",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Presence"
                    ],
                    "resource": [
                        "Presence"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "chatId": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "offline",
            "displayName": "Presence",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Set Presence"
                    ],
                    "resource": [
                        "Presence"
                    ]
                }
            },
            "name": "presence",
            "options": [
                {
                    "name": "Offline",
                    "value": "offline"
                },
                {
                    "name": "Online",
                    "value": "online"
                },
                {
                    "name": "Typing",
                    "value": "typing"
                },
                {
                    "name": "Recording",
                    "value": "recording"
                },
                {
                    "name": "Paused",
                    "value": "paused"
                }
            ],
            "required": true,
            "routing": {
                "request": {
                    "body": {
                        "presence": "={{ $value }}"
                    }
                }
            },
            "type": "options"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/presence",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Presence All"
                    ],
                    "resource": [
                        "Presence"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Presence All"
                    ],
                    "resource": [
                        "Presence"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/{session}/presence/{chatId}",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Presence"
                    ],
                    "resource": [
                        "Presence"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Presence"
                    ],
                    "resource": [
                        "Presence"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123456789@c.us",
            "description": "Chat ID",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get Presence"
                    ],
                    "resource": [
                        "Presence"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "POST /api/{session}/presence/{chatId}/subscribe",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Subscribe"
                    ],
                    "resource": [
                        "Presence"
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
            "default": "default",
            "description": "Session name",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Subscribe"
                    ],
                    "resource": [
                        "Presence"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "type": "string"
        },
        {
            "default": "123456789@c.us",
            "description": "Chat ID",
            "displayName": "Chat Id",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Subscribe"
                    ],
                    "resource": [
                        "Presence"
                    ]
                }
            },
            "name": "chatId",
            "required": true,
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /api/screenshot",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Screenshot"
                    ],
                    "resource": [
                        "Screenshot"
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
            "default": "default",
            "displayName": "Session",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Screenshot"
                    ],
                    "resource": [
                        "Screenshot"
                    ]
                }
            },
            "name": "session",
            "required": true,
            "routing": {
                "request": {
                    "qs": {
                        "session": "={{ $value }}"
                    }
                }
            },
            "type": "string"
        },
        {
            "default": "",
            "displayName": "GET /ping",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Ping"
                    ],
                    "resource": [
                        "Observability"
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
            "displayName": "GET /health",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Check"
                    ],
                    "resource": [
                        "Observability"
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
            "displayName": "GET /api/server/version",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Get"
                    ],
                    "resource": [
                        "Observability"
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
            "displayName": "GET /api/server/environment",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Environment"
                    ],
                    "resource": [
                        "Observability"
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
            "description": "Include all environment variables",
            "displayName": "All",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Environment"
                    ],
                    "resource": [
                        "Observability"
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
            "displayName": "GET /api/server/status",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Status"
                    ],
                    "resource": [
                        "Observability"
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
            "displayName": "POST /api/server/stop",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Stop"
                    ],
                    "resource": [
                        "Observability"
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
            "description": "By default, it gracefully stops the server, but you can force it to terminate immediately.",
            "displayName": "Force",
            "displayOptions": {
                "show": {
                    "operation": [
                        "Stop"
                    ],
                    "resource": [
                        "Observability"
                    ]
                }
            },
            "name": "force",
            "routing": {
                "request": {
                    "body": {
                        "force": "={{ $value }}"
                    }
                }
            },
            "type": "boolean"
        }
    ]
    expect(result).toEqual(expected);
})
