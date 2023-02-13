import { fetchAPI, endPointWithPathOrQuery } from "../utils/index.js";
import settings from "../settings/index.js";
//?q=mario&media_format=gif&provider=tenor&locale=fr

export const search = async (request, reply) => {
  if (
    !request.query.q ||
    request.query.q == "" ||
    !request.query.lng ||
    request.query.lng == "" ||
    !request.query.provider ||
    request.query.provider == ""
  ) {
    return reply.code(412).type("text/html").send("bad request");
  }
  return reply
    .code(200)
    .type("application.json")
    .send(
      JSON.stringify(
        await getGif(request.query.q, request.query.lng, request.query.provider)
      )
    );
};

const getGif = async (q, locale, provider) => {
  const query = endPointWithPathOrQuery(settings.gifUrl, [], {
    q,
    media_format: "gif",
    provider,
    locale,
  });
  console.log(query);
  return fetchAPI(query, "GET");
};
