import { fail, deepEqual } from "assert";
import api from "../../utils/index.js";
import sinon from "sinon";
import { afterEach, beforeEach, describe } from "mocha";
import FastifyServer from "../../index.js";
import ExpectedRadioResponse from "../mock/radio.json";

let server;

beforeEach(() => {
	server = FastifyServer;
});

describe("RadioTest Api functional test", () => {
	it("it should receive radioJson", async () => {
		const sandbox = sinon.createSandbox();
		const mock = sandbox
			.stub(api)
			.fetchAPI.callsFake(() => Promise.resolve(ExpectedRadioResponse));
		const res = async () =>
			api.fetchAPI("http://localhost:8000/radio/search?name=Generation", "GET");
		await res()
			.then((result) => deepEqual(result, ExpectedRadioResponse))
			.catch((err) => fail(new Error(err)))
			.finally(() => {
				sandbox.restore();
				mock.restore();
			});
	});
});

afterEach(() => {
	server.close().then().catch();
});
