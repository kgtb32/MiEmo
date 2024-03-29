import settings from '../settings/settings'

import mock from './mock/'
import real from './real/'

const api = () => {
	return settings.useMock ? mock : real
}

const apis = {
	weather: {
		get: (latitude, longitude, enabledValues, type, timezone) => {
			return api().weather.get(latitude, longitude, enabledValues, type, timezone)
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
	youtube: {
		search: name => {
			return api().youtube.search(name)
		},
	},
	joke: {
		get: () => {
			return api().joke.get()
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
	bluetooth: {
		list: () => api().bluetooth.list(),
		connect: mac => api().bluetooth.connect(mac),
		remove: mac => api().bluetooth.remove(mac),
		startDiscovery: () => api().bluetooth.startDiscovery(),
		endDiscovery: () => api().bluetooth.endDiscovery(),
		pairedDevices: () => api().bluetooth.pairedDevices(),
	},
	whiteNoise: {
		list: () => api().whiteNoise.list(),
	},
	game: {
		list: platform_uuid => api().game.list(platform_uuid),
		platform: () => api().game.platform(),
		getPlatform: platform_uuid => api().game.getPlatform(platform_uuid),
		get: game_uuid => api().game.get(game_uuid),
		play: game_uuid => api().game.play(game_uuid),
	},
	hologram: {
		availableHolograms: () => api().hologram.availableHolograms(),
		addHologram: src => api().hologram.addHologram(src),
		deleteHologram: uuid => api().hologram.deleteHologram(uuid),
		setHologramSetttings: (selectedHologram, changeOnGameStart) =>
			api().hologram.setHologramSetttings(selectedHologram, changeOnGameStart),
		hologramSettings: () => api().hologram.hologramSettings(),
		setHoloMode: mode => api().hologram.setHoloMode(mode),
	},
	gif: {
		search: q => api().gif.search(q),
	},
}

export default apis
