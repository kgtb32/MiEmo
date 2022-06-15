import RadioBrowser from "radio-browser";

export const search = async (request, reply) => {
  if (!request.query.name || request.query.name == "") {
    return reply.code(512).type("text/html").send("pre condition failed");
  }
  const searchResult = await RadioBrowser.searchStations({
    name: request.query.name,
  });
  return reply
    .code(200)
    .type("application/json")
    .send(JSON.stringify(searchResult));
};

export default { search };
