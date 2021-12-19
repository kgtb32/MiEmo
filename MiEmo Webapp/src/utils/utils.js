import dayjs from 'dayjs'

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

export const parseISO8601Date = dateToParse => {
	return dayjs(dateToParse)
}

export const getClosedDate = ISO8601Dates => {
	const now = new Date()
	let dateDiff = 99999999999
	let dateIndex = 0
	ISO8601Dates.map((e, i) => {
		const date = parseISO8601Date(e)
		const currentDateDiff = date.diff(now)
		if (currentDateDiff >= 0 && currentDateDiff < dateDiff) {
			dateIndex = i
			dateDiff = currentDateDiff
		}
	})
	return dateIndex
}
