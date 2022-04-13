import dayjs from 'dayjs'
import 'dayjs/locale/fr'

dayjs.locale('fr')

import WeatherImageFactory from '../static/WeatherImageFactory'
import WeatherImage from '../static/json/weatherImage.json'

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
	const now = momentNow()
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

export const isSameDay = (dayjsDate1, dayjsDate2) => {
	return (
		dayjs(dayjsDate1).day() == dayjs(dayjsDate2).day() &&
		dayjs(dayjsDate1).month() == dayjs(dayjsDate2).month() &&
		dayjs(dayjsDate1).year() == dayjs(dayjsDate2).year()
	)
}

export const generateDay = dayjsdate => {
	return dayjs(dayjsdate).format('DD/MM/YYYY')
}

export const momentNow = () => {
	return dayjs(new Date())
}

export const imageFromWMOCode = WMOCode => {
	return WeatherImageFactory[WeatherImage[WMOCode]]
}

export const getDayFormated = dayjsDate => {
	return dayjs(dayjsDate).format('dddd')
}

export const loadLocalStorageKeyAsJsonObject = (key, defaultValue) => {
	try {
		return JSON.parse(loadLocalStorageKey(key, JSON.stringify(defaultValue)))
	} catch {
		return defaultValue
	}
}

export const loadLocalStorageKey = (key, defaultValue) => {
	try {
		return localStorage.getItem(key) ?? defaultValue
	} catch {
		return defaultValue
	}
}

export const bitFlags = {
	setBitFlag: (flag, currentFlag, state) => {
		return state == 1 ? currentFlag | flag : currentFlag & ~flag
	},
	isOn: (flag, currentFlag) => {
		return (currentFlag & flag) === flag
	},
	setMultipleBitFlags: (currentFlag, flags) => {
		let baseFlag = currentFlag
		flags.map(({ flag, state }) => {
			baseFlag = bitFlags.setBitFlag(flag, baseFlag, state)
		})
		return baseFlag
	},
}
