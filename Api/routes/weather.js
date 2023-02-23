import { fetchAPI, generateQueryString } from "../utils/index.js";
import settings from "../settings/index.js";

export const get = async (request, reply) => {
  if (
    !request.query.latitude ||
    !request.query.longitude ||
    (!request.query.hourly && !request.query.daily)
  ) {
    return reply.code(412).type("text/html").send("pre condition failed");
  }
  return reply
    .code(200)
    .type("application.json")
    .send(JSON.stringify(await getWeather(request)));
};

export const getWeather = async (request) => {
  const queryString = generateQueryString(
    settings.weatherAPIUrl,
    Object.keys(request.query).map((e) => {
      return { name: e, val: request.query[e] };
    })
  );
  return fetchAPI(queryString, "GET");
};

export default { getWeather, get };
