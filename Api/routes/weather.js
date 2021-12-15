import { fetchAPI, generateQueryString } from "../utils/index.js";
import settings from "../settings/index.js";

export const get = async (request, reply) => {

	if (
		!request.query.latitude &&
		!request.query.longitude &&
		!request.query.hourly
	) {
		return reply.code(512).type("text/html").send("pre condition failed");
	}

	const queryString = generateQueryString(
		settings.weatherAPIUrl,
		Object.keys(request.query).map((e) => {
			return { name: e, val: request.query[e] };
		})
	);
	console.log(queryString);
	const res = await fetchAPI(queryString, "GET");
	return reply.code(200).type('application/json').send(JSON.stringify(res))
};
