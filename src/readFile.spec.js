import process from "process";
import { readFile } from "./readFile";

jest.mock("./request");

describe("readFile.js", () => {
    describe("readFile method", () => {
        test("takes a data file and returns its contents", async () => {
            let expectedResult =
                `Driver Dan\n` +
                `Driver Alex\n` +
                `Driver Bob\n` +
                `Trip Dan 07:15 07:45 17.3\n` +
                `Trip Dan 06:12 06:32 21.8\n` +
                `Trip Alex 12:01 13:16 42.0`;
            process.argv = [, , "data.txt"];

            expect.assertions(1);
            const data = await readFile(result => result);
            expect(data).toMatch(expectedResult);
        });
    });
});
