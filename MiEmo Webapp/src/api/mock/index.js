import WeatherGet from './weather/get.json'
import cityFind from './city/city.json'

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
}
