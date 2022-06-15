import settings from '../settings/settings'

import mock from './mock/'
import real from './real/'

const api = () => {
	return settings.useMock ? mock : real
}

const apis = {
	weather: {
		get: (latitude, longitude, enabledValues) => {
			return api().weather.get(latitude, longitude, enabledValues)
		},
	},
	city: {
		find: cityName => {
			return api().city.find(cityName)
		},
	},
	emotion: {
		detect: base64Image => {
			return api().emotion.detect(base64Image)
		},
	},
	radio: {
		search: name => {
			return api().radio.search(name)
		},
	},
	wifi: {
		list: () => api().wifi.list(),
		connect: (ssid, password) => api().wifi.connect(ssid, password),
	},
	audio: {
		info: () => api().audio.info(),
		sinks: {
			default: () => api().audio.sinks.default(),
			setVolume: (sink, volume) => api().audio.sinks.setVolume(sink, volume),
			setDefaultSink: sink => api().audio.sinks.setDefaultSink(sink),
		},
	},
}

export default apis
