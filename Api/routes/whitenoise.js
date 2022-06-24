import { readFile } from "fs/promises";

export const list = async (request, reply) => {
  return reply
    .code(200)
    .type("application/json")
    .send(JSON.stringify(await getWhiteNoise()));
};

export const getWhiteNoise = async () => {
  return (
    JSON.parse(
      await readFile(new URL("../whitenoise.json", import.meta.url))
    ) ?? []
  );
};

export default { list, getWhiteNoise };
