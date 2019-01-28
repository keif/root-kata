// jest.mock("./request");

import process from "process";

import { readFile } from "./readFile";

describe("readFile.js", () => {
    describe("readFile method", () => {
        it("works with promises", () => {
            process.argv = [, , "data.txt"];
            return readFile().then(data => expect(data).toEqual("Mark"));
            expect.assertions(1);
        });
    });
});
