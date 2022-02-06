// Require the framework and instantiate it

import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { get as weatherGet } from "./routes/weather.js";
import { get as geocodingGet } from "./routes/city.js";
import { list as whiteNoiseList } from "./routes/whitenoise.js";
import { search as radioSearch } from "./routes/radio.js";
import { search as youtubeSearch } from "./routes/youtube.js";

export const generateRoutes = () => {
  const fastifyServer = fastify({ logger: true });
  fastifyServer.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  fastifyServer.get("/weather/get", weatherGet);

  fastifyServer.get("/city/find", geocodingGet);

  fastifyServer.get("/radio/search", radioSearch);

  fastifyServer.post("/whitenoise/list", whiteNoiseList);

  fastifyServer.get("/youtube/search", youtubeSearch);

  fastifyServer.register(fastifyCors, {
    origin: "http://localhost:3000",
  });
  return fastifyServer;
};

const start = () => {
  return new Promise((resolve, reject) => {
    try {
      generateRoutes()
        .listen(8000)
        .then()
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
      process.exit(1);
    }
  });
};
start();

export { start };
