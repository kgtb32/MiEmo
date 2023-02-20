import { actionAddWidget, actionJoke, actionSearchMeteo, getDateNow, dontUnderstand } from './action'

export const command = (value, widgetEventManager, setIsClick) => {
	value = normalize(value)
	switch (true) {
		case isMatch(detect[0].meteo, value):
			actionAddWidget(0, widgetEventManager, setIsClick)
			break
		case isMatch(detect[0].subaction1, value):
			actionSearchMeteo(setIsClick)
			break
		case isMatch(detect[1].clock, value):
			actionAddWidget(1, widgetEventManager, setIsClick)
			break
		case isMatch(detect[1].flipClock, value):
			actionAddWidget(2, widgetEventManager, setIsClick)
			break
		case isMatch(detect[1].getDateNow, value):
			getDateNow(setIsClick)
			break
		case isMatch(detect[2].youtube, value):
			actionAddWidget(3, widgetEventManager, setIsClick)
			break
		case isMatch(detect[3].calendar, value):
			actionAddWidget(4, widgetEventManager, setIsClick)
			break
		case isMatch(detect[4].emotion, value):
			actionAddWidget(5, widgetEventManager, setIsClick)
			break
		case isMatch(detect[5].activity, value):
			actionAddWidget(6, widgetEventManager, setIsClick)
			break
		case isMatch(detect[6].radio, value):
			actionAddWidget(7, widgetEventManager, setIsClick)
			break
		case isMatch(detect[7].todo, value):
			actionAddWidget(8, widgetEventManager, setIsClick)
			break
		case isMatch(detect[8].drawing, value):
			actionAddWidget(9, widgetEventManager, setIsClick)
			break
		case isMatch(detect[9].whitenoise, value):
			actionAddWidget(10, widgetEventManager, setIsClick)
			break
		case isMatch(detect[10].joke, value):
			actionJoke(setIsClick)
			break
		default:
			dontUnderstand(setIsClick)
			return ''
	}
}

//should be Lowercase without special character
export const detect = [
	{
		meteo: ['meteo'],
		subaction1: [
			'recherche',
			'trouve',
			'climat',
			'Conditions meteorologiques',
			'temperature',
			'previsions meteorologiques',
			'temps atmospherique',
			'conditions climatiques',
			'temps exterieur',
			'phenomenes meteorologiques',
			'meteo locale',
			'conditions atmospheriques',
			'temperatures',
			'previsions',
			'meteorologie',
			'taux humidite',
			'pluviometrie',
			'vents',
			'nuages',
			'tempete',
			'orage',
			'ensoleillement',
			'neige',
			'pluie',
			'canicule',
			'froid',
			'brouillard',
			'brume',
			'nuageux',
			'couvert',
			'pluvieux',
			'sec',
			'chaud',
			'venteux',
			'orageux',
		],
	},
	{
		clock: ['horloge analogique'],
		flipClock: ['horloge numerique'],
		getDateNow: ['heure', 'date', 'le combien'],
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
