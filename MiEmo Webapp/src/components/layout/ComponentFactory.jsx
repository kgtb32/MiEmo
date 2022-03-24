import React from 'react'
const Clock = React.lazy(() => import('../Widgets/Clocks/Clock'))
const Meteo = React.lazy(() => import('../Widgets/Meteo/Meteo'))
const FlipClock = React.lazy(() => import('../Widgets/Clocks/FlipClock'))
const Youtube = React.lazy(() => import('../Widgets/Youtube'))
const Calendar = React.lazy(() => import('../Widgets/Calendars/Calendar'))
const EmotionWidget = React.lazy(() => import('../Widgets/EmotionWidget/EmotionWidget'))

const componentFactory = {
	'com.miemo.widgets.meteo': Meteo,
	'com.miemo.widgets.clock': Clock,
	'com.miemo.widgets.flipClock': FlipClock,
	'com.miemo.widgets.youtube': Youtube,
	'com.miemo.widgets.calendar': Calendar,
	'com.miemo.widgets.emotionWidget': EmotionWidget,
}

export default componentFactory
