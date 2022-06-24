import { describe } from "mocha";
import { deepEqual, equal } from "assert";
import { generateRoutes } from "../index.js";
import sinon from "sinon";
import ExpectedWhiteNoiseResponse from "./mock/whitenoise.json";

import whitenoise from "../routes/whitenoise.js";

describe("white noise API functional test", () => {
  it("it should receive 200 result code", async () => {
    const app = generateRoutes();
    const response = await app.inject({
      method: "POST",
      url: "/whitenoise/list",
    });
    equal(response.statusCode, 200, "returns a status code of 200");
  });
});

describe("white noise API functional test", () => {
  it("it should receive white noise list object", async () => {
    const app = generateRoutes();
    const sandbox = sinon.createSandbox();
    const spy = sandbox.spy();
    const mock = sandbox
      .stub(whitenoise)
      .getWhiteNoise.callsFake(() => ExpectedWhiteNoiseResponse);
    const response = await app.inject({
      method: "POST",
      url: "/whitenoise/list",
    });
    equal(response.body, JSON.stringify(ExpectedWhiteNoiseResponse));
  });
});
