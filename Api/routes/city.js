import { fetchAPI, generateQueryString } from "../utils/index.js";
import settings from "../settings/index.js";

export const get = async (request, reply) => {
  if (!request.query.cityName || request.query.cityName == "") {
    return reply.code(512).type("text/html").send("pre condition failed");
  }
  return reply
    .code(200)
    .type("application.json")
    .send(JSON.stringify(await getCity(request.query.cityName)));
};

export const getCity = (city) => {
  const queryString = generateQueryString(settings.geocodingApiUrl, [
    {
      name: "name",
      val: city,
    },
  ]);

  return fetchAPI(queryString, "GET");
};

export default { getCity, get };
