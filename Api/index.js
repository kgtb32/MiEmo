// Require the framework and instantiate it

import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { get as weatherGet } from "./routes/weather.js";

const fastifyServer = fastify({ logger: true });

fastifyServer.get("/", async (request, reply) => {
	return { hello: "world" };
});

fastifyServer.get("/weather/get", weatherGet);

fastifyServer.register( fastifyCors, {
	origin: 'http://localhost:3000'
  })
  

const start = async () => {
	try {
		await fastifyServer.listen(8000);
	} catch (err) {
		fastifyServer.log.error(err);
		process.exit(1);
	}
};
start();
