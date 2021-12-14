export const generateQueryString = (urlStr, parameters) => {
	const finalUrl = new URL(urlStr)
	let params = finalUrl.searchParams
	parameters.map(e => params.append(e.name, e.val))
	return finalUrl.toString()
}
