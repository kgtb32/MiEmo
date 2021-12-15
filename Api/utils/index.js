import fetch from "node-fetch";

export const fetchAPI = (url, method, data, contentType) => {
	return fetch(url, {
		method,
		headers: {
			contentType: contentType ?? "application/json; charset=utf-8",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((res) => Promise.resolve(res))
		.catch((err) => Promise.reject(err));
};

export const generateQueryString = (urlStr, parameters) => {
	const finalUrl = new URL(urlStr);
	let params = finalUrl.searchParams;
	parameters.map((e) => params.append(e.name, e.val));
	return decodeURIComponent(finalUrl.toString());
};
