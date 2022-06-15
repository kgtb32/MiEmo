import { describe } from "mocha";
import { equal } from "assert";
import { generateRoutes } from "../index.js";
import sinon from "sinon";
import ExpectedWeatherResponse from "./mock/weather.json";

import weather from "../routes/weather.js";

describe("Weather API weather test err", () => {
  it("it should receive Weather object", async () => {
    const app = generateRoutes();

    const response = await app.inject({
      method: "GET",
      url: "/weather/get",
    });
    console.log("response", response);
    equal(response.statusCode, 512, "returns a status code of 200");
  });
});

describe("Weather API functional test", () => {
  it("it should receive weather  object", async () => {
    const app = generateRoutes();
    const sandbox = sinon.createSandbox();
    const spy = sandbox.spy();
    const mock = sandbox
      .stub(weather)
      .getWeather.callsFake(() => ExpectedWeatherResponse);
    const response = await app.inject({
      method: "GET",
      url: "http://localhost:8000/weather/get?latitude=49.03645&longitude=2.07613&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,windspeed_10m,weathercode",
    });
    console.log(response);
    equal(response.statusCode, 200, "returns a status code of 200");
  });
});
