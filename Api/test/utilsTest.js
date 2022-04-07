import { equal } from "assert";
import { generateQueryString } from "../utils/index.js";

describe("UtilsTests", () => {
  describe("generateQueryString test", () => {
    it("it should generate query string with good url and only one param", () => {
      const baseUrl = "http://google.fr";
      const params = [{ name: "key", val: "value" }];
      const expectedResult = "http://google.fr/?key=value";
      equal(generateQueryString(baseUrl, params), expectedResult);
    });
    it("it should generate query string with good url and at least one param", () => {
      const baseUrl = "http://google.fr";
      const params = [
        { name: "key1", val: "value1" },
        { name: "key2", val: "value2" },
        { name: "key3", val: "value3" },
      ];
      const expectedResult =
        "http://google.fr/?key1=value1&key2=value2&key3=value3";
      equal(generateQueryString(baseUrl, params), expectedResult);
    });
  });
});
