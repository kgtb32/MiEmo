export default {
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
}
