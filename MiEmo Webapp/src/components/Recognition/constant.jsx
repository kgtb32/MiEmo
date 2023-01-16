import componentFactory from '../layout/ComponentFactory'
import jokes from './joke.json'

export const allComponent = Object.keys(componentFactory).map(key => componentFactory[key])
export const allComponentKey = Object.keys(componentFactory)
const synth = window.speechSynthesis

export const command = (value, widgetEventManager, setIsClick, showInfo) => {
	value = normalize(value)
	switch (true) {
		case isMatch(detect[0].meteo, value):
			action(0, widgetEventManager, setIsClick, showInfo)
			break
		case isMatch(detect[1].clock, value):
			action(1, widgetEventManager, setIsClick, showInfo)
			break
		case isMatch(detect[2].flipClock, value):
			action(2, widgetEventManager, setIsClick, showInfo)
			break
		case isMatch(detect[3].youtube, value):
			action(3, widgetEventManager, setIsClick, showInfo)
			break
		case isMatch(detect[4].calendar, value):
			action(4, widgetEventManager, setIsClick, showInfo)
			break
		case isMatch(detect[5].emotion, value):
			action(5, widgetEventManager, setIsClick, showInfo)
			break
		case isMatch(detect[6].activity, value):
			action(6, widgetEventManager, setIsClick, showInfo)
			break
		case isMatch(detect[7].radio, value):
			action(7, widgetEventManager, setIsClick, showInfo)
			break
		case isMatch(detect[8].todo, value):
			action(8, widgetEventManager, setIsClick, showInfo)
			break
		case isMatch(detect[9].drawing, value):
			action(9, widgetEventManager, setIsClick, showInfo)
			break
		case isMatch(detect[10].whitenoise, value):
			action(10, widgetEventManager, setIsClick, showInfo)
			break
		case isMatch(detect[11].joke, value):
			actionJoke(setIsClick)
			break
		default:
			console.log('default')
			return ''
	}
}

export const isMatch = (detect, value) => {
	let _isMatch = false
	detect.map(text => value.includes(text) && (_isMatch = true))
	return _isMatch
}

export const normalize = value => {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
}

export const action = (index, widgetEventManager, setIsClick, showInfo) => {
	widgetEventManager.emit('itemAdd', allComponentKey[index])
	setIsClick(false)
	showInfo('Votre Wideget ' + allComponent[index].name + ' est ajouté')
}

export const actionJoke = async setIsClick => {
	const joke = jokes[Math.floor(Math.random() * jokes.length)]
	if (synth.speaking) {
		console.log('speechSynthesis.speaking')
		return
	}

	const utterThis = new SpeechSynthesisUtterance(joke.joke + 'réponse ' + joke.answer)
	utterThis.volume = 1.5
	utterThis.pitch = 1
	utterThis.rate = 1
	utterThis.lang = 'fr-FR'
	utterThis.voice = window.speechSynthesis.getVoices()[2]
	synth.speak(utterThis)
	setIsClick(false)
}

//should be Lowercase without special character
export const detect = [
	{
		meteo: ['meteo'],
	},
	{
		clock: ['horloge analogique'],
	},
	{
		flipClock: ['horloge numerique'],
	},
	{
		youtube: ['youtube'],
	},
	{
		calendar: ['calendrier'],
	},
	{
		emotion: ['emotion'],
	},
	{
		activity: ['activite'],
	},
	{
		radio: ['radio'],
	},
	{
		todo: ['tache'],
	},
	{
		drawing: ['dessiner', 'dessine'],
	},
	{
		whitenoise: ['sons', 'blancs', 'son'],
	},
	{
		joke: ['blague', 'blagues', 'une autre', 'encore'],
	},
]
