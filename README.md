# @devlikeapro/n8n-openapi-node

Turn Your **OpenAPI** (**Swagger**) spec into a **n8n node**!

![n8n logo](n8n.png)
![openapi logo](openapi.png)

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Overview](#overview)
  * [Customization](#customization)
    + [Resource](#resource)
    + [Operation](#operation)
    + [Fields](#fields)
- [Use Cases](#use-cases)
- [FAQ](#faq)
  * [I have only OpenAPI v2 spec, what can I do?](#i-have-only-openapi-v2-spec-what-can-i-do)
  * [I have openapi.yaml spec, what can I do?](#i-have-openapiyaml-spec-what-can-i-do)
  * [How to set up credentials from OpenAPI v3 spec?](#how-to-set-up-credentials-from-openapi-v3-spec)
  * [Why it doesn't work with my OpenAPI spec?](#why-it-doesnt-work-with-my-openapi-spec)

<!-- tocstop -->

# Installation

Add `@devlikeapro/n8n-openapi-node` as dependency

```bash
npm install @devlikeapro/n8n-openapi-node
# OR
pnpm add @devlikeapro/n8n-openapi-node
# OR
yarn add @devlikeapro/n8n-openapi-node
```

# Usage

Add your `openapi.json` to `src/{NodeName}` folder
(use **OpenAPI v3** and **json**, see [FAQ](#faq) if you don't have it)

Get your `Node.properties` from OpenAPI v3 spec:

```typescript
import {INodeType, INodeTypeDescription} from 'n8n-workflow';
import {N8NPropertiesBuilder, N8NPropertiesBuilderConfig} from '@devlikeapro/n8n-openapi-node';
import * as doc from './openapi.json'; // <=== Your OpenAPI v3 spec

const config: N8NPropertiesBuilderConfig = {}
const parser = new N8NPropertiesBuilder(doc, config);
const properties = parser.build()

export class Petstore implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Petstore',
    name: 'petstore',
    icon: 'file:petstore.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Petstore API',
    defaults: {
      name: 'Petstore',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'petstoreApi',
        required: false,
      },
    ],
    requestDefaults: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      baseURL: '={{$credentials.url}}',
    },
    properties: properties, // <==== HERE
  };
}
```

## Overview

tbd

## Customization

### Resource

tbd

### Operation

tbd

### Fields

tbd

# Use Cases

Here's n8n community nodes generated from OpenAPI specifications you can use for reference:

- [@devlikeapro/n8n-nodes-petstore](https://github.com/devlikeapro/n8n-nodes-petstore) - Petstore example generated from
  [Petstore openapi.json](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.yaml)
- [@devlikeapro/n8n-nodes-chatwoot](https://github.com/devlikeapro/n8n-nodes-chatwoot) - ChatWoot n8n community node
  from
  [https://www.chatwoot.com/developers/api/](https://www.chatwoot.com/developers/api/). Defines credentials as well (
  manually)
- [@devlikeapro/n8n-nodes-waha](https://github.com/devlikeapro/n8n-nodes-waha) - **WAHA** - Self-hosted **WhatsApp HTTP
  API** you can run in a click!

# FAQ

## I have only OpenAPI v2 spec, what can I do?

Paste your OpenAPI 2.0 definition into https://editor.swagger.io and select **Edit > Convert to OpenAPI 3** from the
menu.

https://stackoverflow.com/a/59749691

## I have openapi.yaml spec, what can I do?

Paste your yaml spec to https://editor.swagger.io and select **File > Save as JSON** from the menu.

## How to set up credentials from OpenAPI v3 spec?

Right now you need to define it manually.
Check [ChatWoot node](https://github.com/devlikeapro/n8n-nodes-chatwoot)
for an example.

## Why it doesn't work with my OpenAPI spec?

Open [a new issue](https://github.com/devlikeapro/n8n-openapi-node/issues) and please attach
your openapi.json file and describe the problem (logs are helpful too).


