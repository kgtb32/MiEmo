import api from '../../../api'
import componentFactory from '../../layout/ComponentFactory'
import { loadLocalStorageKeyAsJsonObject, generateDay, momentNow, hoursNow } from '../../../utils/utils'
import weatherText from '../../../static/json/weatherText.json'

const synth = window.speechSynthesis
export const allComponent = Object.keys(componentFactory).map(key => componentFactory[key])
export const allComponentKey = Object.keys(componentFactory)
export const setutterThis = value => {
	const utterThis = new SpeechSynthesisUtterance(value)
	utterThis.volume = 1.5
	utterThis.pitch = 1
	utterThis.rate = 0.8
	utterThis.lang = 'fr-FR'
	utterThis.voice = window.speechSynthesis.getVoices()[2]
	return utterThis
}

export const actionAddWidget = (index, widgetEventManager, setIsClick) => {
	widgetEventManager.emit('itemAdd', allComponentKey[index], true)
	setIsClick(false)
}

export const actionJoke = async setIsClick => {
	const fetchAPI = async () => api.joke.get()
	const joke = await fetchAPI().then(res => {
		return res
	})
	if (synth.speaking) {
		console.log('speechSynthesis.speaking')
		return
	}

	synth.speak(setutterThis(joke.joke + ' ' + joke.answer))
	setIsClick(false)
}

export const getDateNow = setIsClick => {
	synth.speak(
		setutterThis(
			'Nous somme le ' +
				generateDay(momentNow()).toString() +
				'. ' +
				'Et il est actullement ' +
				hoursNow().toString(),
		),
	)
	setIsClick(false)
}

export const actionSearchMeteo = setIsClick => {
	const city = loadLocalStorageKeyAsJsonObject('com.miemo.meteo.city', {})
	const execute = async () => {
		return api.weather.get(
			city.latitude,
			city.longitude,
			['weathercode', 'temperature_2m_max'],
			'daily',
			city.timezone,
		)
	}

	const buildTextForWeatherCode = res => {
		const indexForToday = res.daily.time.map(date => generateDay(date)).indexOf(generateDay(momentNow()))
		return (
			'Aujourdhui à ' +
			city.name +
			' ' +
			weatherText.find(e => e.code == res.daily.weathercode[indexForToday]).text +
			'. avec une température maximum de' +
			res.daily.temperature_2m_max[indexForToday] +
			' °'
		)
	}

	if (city.name) {
		execute()
			.then(res => {
				synth.speak(setutterThis(buildTextForWeatherCode(res)))
				setIsClick(false)
			})
			.catch(err => console.log(err))
	} else {
		synth.speak(
			setutterThis(
				'Impossible de vous donner la météo. veuillez au préalable sélectionner une ville via le widjètte météo',
			),
		)
		setIsClick(false)
	}
}
