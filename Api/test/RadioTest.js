import { describe } from "mocha";
import { equal } from "assert";
import { generateRoutes } from "../index.js";
import sinon from "sinon";
import ExpectedRadioResponse from "./mock/radio.json";
import RadioBrowser from "radio-browser";

describe("Radio API functional test err", () => {
  it("it should receive hello world object", async () => {
    const app = generateRoutes();

    const response = await app.inject({
      method: "GET",
      url: "/radio/search",
    });
    equal(response.statusCode, 512, "returns a status code of 200");
  });
});

describe("Radio API functional test", () => {
  it("it should receive Weather object", async () => {
    const app = generateRoutes();
    const sandbox = sinon.createSandbox();
    const spy = sandbox.spy();
    const mock = sandbox
      .stub(RadioBrowser)
      .searchStations.callsFake(() => ExpectedRadioResponse);
    const response = await app.inject({
      method: "GET",
      url: "/radio/search?name=Generation",
    });
    equal(response.statusCode, 200, "returns a status code of 200");
  });
});
