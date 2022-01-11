import { fetchAPI, generateQueryString } from "../utils/index.js";

import settings from "../settings/index.js";

export const get = async (request, reply) => {
  if (!request.query.cityName && request.query.cityName == "") {
    return reply.code(512).type("text/html").send("pre condition failed");
  }

  const queryString = generateQueryString(settings.geocodingApiUrl, [
    {
      name: "name",
      val: request.query.cityName,
    },
  ]);
  const res = await fetchAPI(queryString, "GET");

  return reply.code(200).type("application.json").send(JSON.stringify(res));
};
