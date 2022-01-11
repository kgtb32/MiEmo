import settings from '../../settings/settings'

import { generateMeteoAvailable, generateQueryString } from '../../utils/utils'

const fetchAPI = (url, method, data, contentType) => {
	return fetch(url, {
		method,
		headers: {
			contentType: contentType ?? 'application/json; charset=utf-8',
		},
		body: JSON.stringify(data),
	})
		.then(response => response.json())
		.then(res => Promise.resolve(res))
		.catch(err => Promise.reject(err))
}

export default {
	weather: {
		get: (latitude, longitude, enabledValues) => {
			return fetchAPI(
				generateQueryString(settings.weather.url, [
					{
						name: settings.weather.query.lat,
						val: latitude,
					},
					{
						name: settings.weather.query.lon,
						val: longitude,
					},
					{
						name: settings.weather.query.hour,
						val: generateMeteoAvailable(enabledValues),
					},
				]),
			)
		},
	},
	city: {
		find: cityName => {
			return fetchAPI(
				generateQueryString(settings.city.url, [
					{
						name: settings.city.query.cityName,
						val: cityName,
					},
				]),
			)
		},
	},
}
