import settings from '../../settings/settings'

import { generateMeteoAvailable, generateQueryString } from '../../utils/utils'

const fetchAPI = (url, method, data, contentType) => {
	return fetch(url, {
		method,
		headers: {
			'Content-Type': contentType ?? 'application/json; charset=utf-8',
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
	emotion: {
		detect: base64Image => {
			return fetchAPI(
				settings.emotion.url,
				'POST',
				{
					base64_image: base64Image + '',
				},
				'application/json',
			)
		},
	},
	radio: {
		search: name => {
			return fetchAPI(
				generateQueryString(settings.radio.search.url, [
					{
						name: settings.radio.search.query.radioName,
						val: name,
					},
				]),
			)
		},
	},
	wifi: {
		list: () => fetchAPI(settings.wifi.list.url, 'POST', {}, 'application/json'),
		connect: (ssid, password) =>
			fetchAPI(settings.wifi.connect.url, 'POST', { ssid, password }, 'application/json'),
	},
	audio: {
		info: () => fetchAPI(settings.audio.info.url, 'POST', {}, 'application/json'),
		sinks: {
			default: () => fetchAPI(settings.audio.sinks.url, 'POST', {}, 'application/json'),
			setVolume: (sink, volume) =>
				fetchAPI(settings.audio.sinks.setVolume.url, 'POST', { sink, volume }, 'application/json'),
			setDefaultSink: sink =>
				fetchAPI(settings.audio.sinks.setDefaultSink.url, 'POST', { sink }, 'application/json'),
		},
	},
	bluetooth: {
		list: () => fetchAPI(settings.bluetooth.list.url, 'POST', {}, 'application/json'),
		connect: mac => fetchAPI(settings.bluetooth.connect.url, 'POST', { mac }, 'application/json'),
		remove: mac => fetchAPI(settings.bluetooth.remove.url, 'POST', { mac }, 'application/json'),
		startDiscovery: () => fetchAPI(settings.bluetooth.startDiscovery.url, 'POST', {}, 'application/json'),
		endDiscovery: () => fetchAPI(settings.bluetooth.endDiscovery.url, 'POST', {}, 'application/json'),
		pairedDevices: () => fetchAPI(settings.bluetooth.pairedDevices.url, 'POST', {}, 'application/json'),
	},
}
