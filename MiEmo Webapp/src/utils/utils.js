export const generateQueryString = (urlStr, parameters) => {
	const finalUrl = new URL(urlStr)
	let params = finalUrl.searchParams
	parameters.map(e => params.append(e.name, e.val))
	return decodeURIComponent(finalUrl.toString())
}

export const generateMeteoAvailable = whatWanted => {
	return whatWanted.reduce((previousValue, currentValue) => {
		console.log(previousValue, currentValue)
		return previousValue + ',' + currentValue
	})
}
