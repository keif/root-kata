jest.mock('./request');

import { request } from "./request";

describe.only("request.js", () => {
    describe("request method", () => {
        test("works with promises", () => {
            expect.assertions(1);
            return request(4).then(data => expect(data).toEqual("Mark"));
        });

        xtest("the fetch fails with an error", () => {
            expect.assertions(1);
            return request(4).catch(e => expect(e).toMatch("error"));
            done();
        });

        xtest("the data is peanut butter", () => {
            expect.assertions(1);
            return expect(request(4)).resolves.toBe("peanut butter");
            done();
        });

        xtest("the fetch fails with an error", () => {
            expect.assertions(1);
            return expect(request(4)).rejects.toMatch("error");
            done();
        });
    });
});
