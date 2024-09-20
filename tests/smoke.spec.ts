import {OpenAPIN8NParser} from "../src/OpenAPIN8NParser";
import {readdirSync} from 'fs';
import {join} from 'path';
import {sleep} from "n8n-workflow";

// Define the path to your 'examples' directory
const examplesDir = join(__dirname, 'examples');

// Read all JSON files from the examples directory
const jsonFiles = readdirSync(examplesDir).filter(file => file.endsWith('.json'));

describe('smoke', () => {
    test.each(jsonFiles)('%s', async (fileName) => {
        const filePath = join(examplesDir, fileName);
        const doc = require(filePath);
        const parser = new OpenAPIN8NParser(doc);
        parser.process();
        await sleep(50) // wait for logs a bit
    });
});
