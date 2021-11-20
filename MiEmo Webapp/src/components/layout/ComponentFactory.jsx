import Clock from '../Widgets/Clock'
import Meteo from '../Widgets/Meteo/Meteo'

const componentFactory = {
	'com.miemo.widgets.meteo': Meteo,
	'com.miemo.widgets.clock': Clock,
}

export default componentFactory
