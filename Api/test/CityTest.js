import { afterEach, beforeEach, describe } from "mocha";
import { fail, deepEqual, rejects, equal } from "assert";
import { generateRoutes } from "../index.js";
import sinon from "sinon";
import ExpectedRadioResponse from "./mock/cities.json";

import city from "../routes/city.js";

describe("helloWorld API functional test err", () => {
  it("it should receive hello world object", async () => {
    const app = generateRoutes();

    const response = await app.inject({
      method: "GET",
      url: "/city/find",
    });
    console.log("response", response);
    equal(response.statusCode, 512, "returns a status code of 200");
  });
});

describe("helloWorld API functional test", () => {
  it("it should receive hello world object", async () => {
    const app = generateRoutes();
    const sandbox = sinon.createSandbox();
    const spy = sandbox.spy();
    const mock = sandbox
      .stub(city)
      .getCity.callsFake(() => ExpectedRadioResponse);
    const response = await app.inject({
      method: "GET",
      url: "/city/find?cityName=paris",
    });
    equal(response.statusCode, 200, "returns a status code of 200");
  });
});
