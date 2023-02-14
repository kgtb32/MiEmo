import api from '../../../api'
import componentFactory from '../../layout/ComponentFactory'

const synth = window.speechSynthesis
export const allComponent = Object.keys(componentFactory).map(key => componentFactory[key])
export const allComponentKey = Object.keys(componentFactory)

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

	const utterThis = new SpeechSynthesisUtterance(joke.joke + ' ' + joke.answer)
	utterThis.volume = 1.5
	utterThis.pitch = 1
	utterThis.rate = 1
	utterThis.lang = 'fr-FR'
	utterThis.voice = window.speechSynthesis.getVoices()[2]
	synth.speak(utterThis)
	setIsClick(false)
}
