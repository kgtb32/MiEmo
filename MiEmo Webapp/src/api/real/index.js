import settings from '../../settings/settings'

import { generateMeteoAvailable, generateQueryString } from '../../utils/utils'

import fetchRetry from 'fetch-retry'

const fetchAPI = (url, method, data, contentType) => {
	return fetchRetry(fetch)(url, {
		retries: 3,
		retryDelay: 2000,
		method,
		headers: {
			'Content-Type': contentType ?? 'application/json; charset=utf-8',
		},
		body: JSON.stringify(data),
	})
		.then(response => (response.ok ? Promise.resolve(response) : Promise.reject(response)))
		.then(response => {
			return response.text().then(res => {
				try {
					return JSON.parse(res)
				} catch {
					return res
				}
			})
		})
		.then(res => Promise.resolve(res))
		.catch(err => Promise.reject(err))
}

export default {
	weather: {
		get: (latitude, longitude, enabledValues, type, timezone) => {
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
						name: type,
						val: generateMeteoAvailable(enabledValues),
					},
					{
						name: settings.weather.query.timezone,
						val: timezone,
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
	youtube: {
		search: name => {
			return fetchAPI(`${settings.youtube.search.url}?name=${name}`, 'GET')
		},
	},
	joke: {
		get: () => {
			return fetchAPI(`${settings.joke.get.url}`, 'GET')
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
	whiteNoise: {
		list: () => fetchAPI(settings.whiteNoise.list.url, 'POST', {}, 'application/json'),
	},
	game: {
		list: platform_uuid => fetchAPI(`${settings.game.list.url}/?platform__platform_id=${platform_uuid}`, 'GET'),
		platform: () => fetchAPI(settings.game.platformList.url, 'GET'),
		getPlatform: platform_uuid => fetchAPI(`${settings.game.platformList.url}${platform_uuid}/`, 'GET'),
		get: game_uuid => fetchAPI(`${settings.game.list.url}/${game_uuid}/`, 'GET'),
		play: game_uuid => fetchAPI(`${settings.game.play.url}/${game_uuid}/`, 'GET'),
	},
	gif: {
		search: q => fetchAPI(`${settings.apiFullEndpoints.gifSearch()}?q=${q}&lng=fr&provider=tenor`),
	},
	hologram: {
		availableHolograms: () => fetchAPI(settings.apiFullEndpoints.holo(), 'GET'),
		addHologram: holo_url => fetchAPI(settings.apiFullEndpoints.holo(), 'POST', { holo_url }),
		deleteHologram: holo_uuid => fetchAPI(`${settings.apiFullEndpoints.holo()}${holo_uuid}/`, 'DELETE'),
		hologramSettings: () => fetchAPI(settings.apiFullEndpoints.holosettings(), 'GET'),
		setHologramSetttings: (selectedHologram, changeOnGameStart) =>
			fetchAPI(settings.apiFullEndpoints.holosettings(), 'POST', { selectedHologram, changeOnGameStart }),
		setHoloMode: mode => fetchAPI(settings.apiFullEndpoints.holoMode(), 'POST', { mode }),
	},
}
