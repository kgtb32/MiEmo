export default {
	useMock: false,
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
