import WeatherGet from './weather/get.json'
import cityFind from './city/city.json'
import EmotionDetect from './emotion/detect.json'

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
}
