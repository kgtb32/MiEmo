let settings = {
	useMock: true,
	isProd: false,
	emotion: {
		url: 'http://localhost:5000/emotion/detect',
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
}

const { VITE_UseMock, VITE_IsProd, VITE_EMOTION_URL, VITE_CITY_URL, VITE_WEATHER_URL } = import.meta.env

settings.useMock = JSON.parse(VITE_UseMock ?? settings.useMock)
settings.isProd = JSON.parse(VITE_IsProd ?? settings.isProd)
settings.emotion.url = VITE_EMOTION_URL ?? settings.emotion.url
settings.city.url = VITE_CITY_URL ?? settings.city.url
settings.weather.url = VITE_WEATHER_URL ?? settings.weather.url

export default settings
