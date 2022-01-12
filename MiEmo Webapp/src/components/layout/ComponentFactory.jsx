import Clock from '../Widgets/Clocks/Clock'
import Meteo from '../Widgets/Meteo/Meteo'
import FlipClock from '../Widgets/Clocks/FlipClock'

const componentFactory = {
	'com.miemo.widgets.meteo': Meteo,
	'com.miemo.widgets.clock': Clock,
	'com.miemo.widgets.flipClock': FlipClock,
}

export default componentFactory
