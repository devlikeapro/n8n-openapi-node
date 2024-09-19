import {Parser} from "../src/parser";

test('petstore.json', async () => {
    const doc = require('./examples/petstore.json');
    const parser = new Parser(doc);
    parser.process()
})

test('waha.json', () => {
    const doc = require('./examples/waha.json');
    const parser = new Parser(doc);
    parser.process()
})

test('chatwoot.json', () => {
    const doc = require('./examples/chatwoot.json');
    const parser = new Parser(doc);
    parser.process()
})
