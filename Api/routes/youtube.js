import { search as ytSearch } from 'youtube-search-without-api-key'


export const search = async (request, reply) => {
    if (!request.query.name || request.query.name == "") {
      return reply.code(512).type("text/html").send("pre condition failed");
    }
    const videos = await ytSearch(request.query.name);

    return reply
      .code(200)
      .type("application/json")
      .send(JSON.stringify(videos));
  };