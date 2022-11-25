import componentFactory from '../layout/ComponentFactory'

export const allComponent = Object.keys(componentFactory).map(key => componentFactory[key])
export const allComponentKey = Object.keys(componentFactory)

export const command = (value, widgetEventManager, setIsClick, showInfo) => {
	value = normalize(value)
	switch (true) {
		case isMatch(detect[0].youtube, value):
			widgetEventManager.emit('itemAdd', allComponentKey[3])
			setIsClick(false)
			showInfo('Votre Wideget ' + allComponent[3].name + ' est ajouté')
			break
		default:
			console.log(detect[0].youtube)
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

export const detect = [
	{
		youtube: ['youtube', 'video'],
	},
]
