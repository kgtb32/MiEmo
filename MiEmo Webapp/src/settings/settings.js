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

const { VITE_UseMock, VITE_IsProd } = import.meta.env

console.log(VITE_UseMock, VITE_IsProd)

settings.useMock = VITE_UseMock ? !!VITE_UseMock : settings.useMock
settings.isProd = VITE_IsProd ? !!VITE_IsProd : settings.isProd
console.log(settings)

export default settings
