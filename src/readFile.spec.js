// jest.mock("./request");

import { readFile } from "./readFile";

xdescribe("readFile.js", () => {
    describe("readFile method", () => {
        it("works with promises", () => {
            console.log("tesT", readFile);
            return readFile("data.text").then(data => expect(data).toEqual("Mark"));
            expect.assertions(1);
        });
    });
});
