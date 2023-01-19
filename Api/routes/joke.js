import { readFile } from "fs/promises";

export const get = async (request, reply) => {
  let joke = JSON.parse(
    await readFile(new URL("../static/jokes.json", import.meta.url))
  );
  joke = joke[Math.floor(Math.random() * joke.length)]
  return reply
    .code(200)
    .type("application/json")
    .send(JSON.stringify(joke));
};

export default { get };
