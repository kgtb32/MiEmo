import WeatherGet from './weather/get.json'
import cityFind from './city/city.json'
import EmotionDetect from './emotion/detect.json'
import RadioSearch from './radio/search.json'
import WifiList from './wifi/list.json'
import WifiConnect from './wifi/connect.json'
import AudioInfo from './audio/info.json'
import AudioSinks from './audio/sinks.json'
import BluetoothList from './bluetooth/list.json'
import WhiteNoiseList from './whitenoise/list.json'
import GameList from './game/list.json'
import PlatformList from './platform/list.json'
import GameGet from './game/get.json'
import Youtube from './youtube/youtube.json'

export default {
	weather: {
		get: () => {
			return Promise.resolve(WeatherGet)
		},
	},
	city: {
		find: () => {
			return Promise.resolve(cityFind)
		},
	},
	emotion: {
		detect: () => {
			return Promise.resolve(EmotionDetect[Math.floor(Math.random() * EmotionDetect.length)])
		},
	},
	radio: {
		search: () => {
			return Promise.resolve(RadioSearch)
		},
	},
	youtube: {
		search: () => {
			return Promise.resolve(Youtube)
		},
	},
	wifi: {
		list: () => Promise.resolve(WifiList),
		connect: () => Promise.resolve(WifiConnect),
	},
	audio: {
		info: () => Promise.resolve(AudioInfo),
		sinks: {
			default: () => Promise.resolve(AudioSinks),
			setVolume: () => Promise.resolve(),
			setDefaultSink: () => Promise.resolve(),
		},
	},
	bluetooth: {
		list: () => Promise.resolve(BluetoothList),
		connect: () => Promise.reject(),
		remove: () => Promise.resolve(),
		startDiscovery: () => Promise.resolve(),
		endDiscovery: () => Promise.resolve(),
		pairedDevices: () => Promise.resolve(BluetoothList),
	},
	whiteNoise: {
		list: () => Promise.resolve(WhiteNoiseList),
	},
	game: {
		list: () => Promise.resolve(GameList),
		platform: () => Promise.resolve(PlatformList),
		getPlatform: () => Promise.resolve(PlatformList[0]),
		get: () => Promise.resolve(GameGet),
		play: () => Promise.resolve(),
	},
}
