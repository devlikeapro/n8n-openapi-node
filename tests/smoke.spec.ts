import {N8NPropertiesBuilder} from "../src/N8NPropertiesBuilder";
import {readdirSync} from 'fs';
import {join} from 'path';
import {sleep} from "n8n-workflow";

// Define the path to your 'samples' directory
const samplesDir = join(__dirname, 'samples');

// Read all JSON files from the samples directory
const jsonFiles = readdirSync(samplesDir).filter(file => file.endsWith('.json'));

describe('smoke', () => {
    test.each(jsonFiles)('%s', async (fileName) => {
        const filePath = join(samplesDir, fileName);
        const doc = require(filePath);
        const parser = new N8NPropertiesBuilder(doc);
        parser.build();
        await sleep(50) // wait for logs a bit
    });
});
