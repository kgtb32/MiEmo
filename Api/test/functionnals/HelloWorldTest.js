import FastifyServer from "../../index.js";
import { fail, deepEqual, ok } from "assert";
import api from "../../utils/index.js";
import sinon from "sinon";
import { beforeEach } from "mocha";

const expectedHelloWorldResponse = { hello: "world" };

let server

beforeEach(() => {
  server = FastifyServer
})

describe("helloWorld API functional test ", () => {
  it("it should receive hello world object", async () => {
    const sandbox = sinon.createSandbox();
    const mock = sandbox
      .stub(api)
      .fetchAPI.callsFake(() =>
        Promise.resolve(expectedHelloWorldResponse)
      );
      const res = async () => api.fetchAPI("http://localhost:8000/", "GET");
      await res()
        .then((result) => deepEqual(result, expectedHelloWorldResponse))
        .catch((err) => fail(new Error(err)))
        .finally(() => {
          sandbox.restore();
          mock.restore();
        });
      });
  });

  afterEach(() => {
    server.close()
      .then()
      .catch()
  })