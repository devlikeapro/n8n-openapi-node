import {OpenAPIN8NParser} from "../src/OpenAPIN8NParser";

test('petstore.json', async () => {
    const doc = require('./examples/petstore.json');
    const parser = new OpenAPIN8NParser(doc);
    parser.process()
})


test('waha.json', async () => {
    const doc = require('./examples/waha.json');
    const parser = new OpenAPIN8NParser(doc);
    parser.process()
})

test('chatwoot.json', () => {
    const doc = require('./examples/chatwoot.json');
    const parser = new OpenAPIN8NParser(doc);
    parser.process()
})
