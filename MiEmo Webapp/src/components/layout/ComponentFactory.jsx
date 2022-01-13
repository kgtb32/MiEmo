import Clock from '../Widgets/Clocks/Clock'
import Meteo from '../Widgets/Meteo/Meteo'
import FlipClock from '../Widgets/Clocks/FlipClock'
import Youtube from '../Widgets/Youtube'

const componentFactory = {
	'com.miemo.widgets.meteo': Meteo,
	'com.miemo.widgets.clock': Clock,
	'com.miemo.widgets.flipClock': FlipClock,
	'com.miemo.widgets.youtube': Youtube,
}

export default componentFactory
