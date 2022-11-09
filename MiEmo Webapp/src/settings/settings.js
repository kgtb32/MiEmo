let settings = {
	useMock: true,
	isProd: false,
	buttons: {
		button_x: 'button_0',
		button_o: 'button_1',
		button_a: 'button_2',
		button_b: 'button_3',
	},
	game: {
		musicVolume: 50,
		musicKey: 'com.miemo.game.music.autoplay',
		platformList: {
			url: 'http://localhost:8000/api/platform/',
		},
		list: {
			url: 'http://localhost:8000/api/game',
		},
		play: {
			url: 'http://localhost:8000/api/play',
		},
	},
	calendar: {
		calIdLocalStorageVal: 'com.miemo.calendar.calendarId',
		calApiKeyLocalStorageVal: 'com.miemo.calendar.apiKey',
	},
	emotion: {
		url: 'http://localhost:5000/emotion/detect',
	},
	radio: {
		search: {
			url: 'http://localhost:8000/radio/search',
			query: {
				radioName: 'name',
			},
		},
	},
	youtube: {
		search: {
			url: 'http://localhost:8000/youtube/search',
		},
	},
	city: {
		query: {
			cityName: 'cityName',
		},
		url: 'http://localhost:8000/city/find',
	},
	weather: {
		url: 'http://localhost:8000/weather/get',
		query: {
			lat: 'latitude',
			lon: 'longitude',
			hour: 'hourly',
			available: {
				temp: 'temperature_2m',
				prec: 'precipitation',
				windspeed: 'windspeed_10m',
				winddir: 'winddirection_10m',
				hum: 'relativehumidity_2m',
				wmo: 'weathercode',
			},
		},
	},
	emotionDetection: {
		cameraCoverMode: 'cover', //can be [fit, cover]
		mirorred: true,
	},
	wifi: {
		list: {
			url: 'http://localhost:8001/wifi/list',
		},
		connect: {
			url: 'http://localhost:8001/wifi/connect',
		},
	},
	audio: {
		info: {
			url: 'http://localhost:8002/audio/info',
		},
		sinks: {
			url: 'http://localhost:8002/audio/sinks',
			setVolume: {
				url: 'http://localhost:8002/audio/sinks/setVolume',
			},
			setDefaultSink: {
				url: 'http://localhost:8002/audio/sinks/setDefaultSink',
			},
		},
	},
	bluetooth: {
		list: {
			url: 'http://localhost:8003/bluetooth/list',
		},
		connect: {
			url: 'http://localhost:8003/bluetooth/connect',
		},
		startDiscovery: {
			url: 'http://localhost:8003/bluetooth/startDiscovery',
		},
		endDiscovery: {
			url: 'http://localhost:8003/bluetooth/endDiscovery',
		},
		remove: {
			url: 'http://localhost:8003/bluetooth/remove',
		},
		pairedDevices: {
			url: 'http://localhost:8003/bluetooth/pairedDevices',
		},
	},
	whiteNoise: {
		list: {
			url: 'http://localhost:8000/whitenoise/list',
		},
	},
}

const {
	VITE_UseMock,
	VITE_IsProd,
	VITE_EMOTION_URL,
	VITE_CITY_URL,
	VITE_WEATHER_URL,
	VITE_RADIO_URL,
	VITE_WIFI_LIST_URL,
	VITE_WIFI_CONNECT_URL,
	VITE_WHITENOISE_URL,

	VITE_GAME_PLATFORM_LIST_URL,
	VITE_GAME_LIST_URL,
	VITE_GAME_PLAY_URL,
} = import.meta.env

settings.useMock = JSON.parse(VITE_UseMock ?? settings.useMock)
settings.isProd = JSON.parse(VITE_IsProd ?? settings.isProd)
settings.emotion.url = VITE_EMOTION_URL ?? settings.emotion.url
settings.city.url = VITE_CITY_URL ?? settings.city.url
settings.weather.url = VITE_WEATHER_URL ?? settings.weather.url
settings.radio.search.url = VITE_RADIO_URL ?? settings.radio.search.url
settings.wifi.list.url = VITE_WIFI_LIST_URL ?? settings.wifi.list.url
settings.wifi.connect.url = VITE_WIFI_CONNECT_URL ?? settings.wifi.connect.url
settings.whiteNoise.list.url = VITE_WHITENOISE_URL ?? settings.whiteNoise.list.url

settings.game.platformList.url = VITE_GAME_PLATFORM_LIST_URL ?? settings.game.platformList.url
settings.game.list.url = VITE_GAME_LIST_URL ?? settings.game.list.url
settings.game.play.url = VITE_GAME_PLAY_URL ?? settings.game.play.url

export default settings
