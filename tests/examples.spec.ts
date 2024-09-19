import {Parser} from "../src/parser";
import * as doc from "./examples/petstore.json"

test('petstore.json', () => {
    const parser = new Parser(doc);
    parser.process()
})
