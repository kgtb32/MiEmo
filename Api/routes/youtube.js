import { GetListByKeyword } from "youtube-search-api";

export const search = async (request, reply) => {
  if (!request.query.name || request.query.name == "") {
    return reply.code(512).type("text/html").send("pre condition failed");
  }
  const searchResult = await GetListByKeyword(request.query.name);
  console.log(searchResult);
  return reply
    .code(200)
    .type("application/json")
    .send(JSON.stringify(searchResult));
};

export default { search };
