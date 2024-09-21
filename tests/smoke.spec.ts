import {N8NPropertiesBuilder} from "../src/N8NPropertiesBuilder";
import {readdirSync} from 'fs';
import {join} from 'path';
import {sleep} from "n8n-workflow";

// Define the path to your 'samples' directory
const examplesDir = join(__dirname, 'examples');

// Read all JSON files from the samples directory
const jsonFiles = readdirSync(examplesDir).filter(file => file.endsWith('.json'));

describe('smoke', () => {
    test.each(jsonFiles)('%s', async (fileName) => {
        const filePath = join(examplesDir, fileName);
        const doc = require(filePath);
        const parser = new N8NPropertiesBuilder(doc);
        parser.build();
        await sleep(50) // wait for logs a bit
    });
});
