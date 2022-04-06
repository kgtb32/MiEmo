import React from 'react'
const Clock = React.lazy(() => import('../Widgets/Clocks/Clock'))
const Meteo = React.lazy(() => import('../Widgets/Meteo/Meteo'))
const FlipClock = React.lazy(() => import('../Widgets/Clocks/FlipClock'))
const Youtube = React.lazy(() => import('../Widgets/Youtube'))
const Calendar = React.lazy(() => import('../Widgets/Calendars/Calendar'))
const EmotionWidget = React.lazy(() => import('../Widgets/EmotionWidget/EmotionWidget'))
const Activity = React.lazy(() => import('../Widgets/Activities/Activity'))

import { TiWeatherPartlySunny } from 'react-icons/ti'
import { IoMdClock } from 'react-icons/io'
import { IoCalendarNumberSharp } from 'react-icons/io5'
import { AiFillClockCircle, AiFillYoutube } from 'react-icons/ai'
import { MdEmojiEmotions } from 'react-icons/md'
import { FiActivity } from 'react-icons/fi'

const componentFactory = {
	'com.miemo.widgets.meteo': { item: Meteo, name: 'Météo', img: TiWeatherPartlySunny, minW: 2, minH: 2 },
	'com.miemo.widgets.clock': { item: Clock, name: 'Horloge analogique', img: IoMdClock, minW: 1, minH: 1 },
	'com.miemo.widgets.flipClock': {
		item: FlipClock,
		name: 'Horloge numérique',
		img: AiFillClockCircle,
		minW: 2,
		minH: 1,
	},
	'com.miemo.widgets.youtube': { item: Youtube, name: 'Youtube', img: AiFillYoutube, minW: 3, minH: 2 },
	'com.miemo.widgets.calendar': { item: Calendar, name: 'Calendrier', img: IoCalendarNumberSharp, minW: 4, minH: 2 },
	'com.miemo.widgets.emotionWidget': {
		item: EmotionWidget,
		name: "Widget détection d'émotions",
		img: MdEmojiEmotions,
		minW: 2,
		minH: 6,
	},
	'com.miemo.widgets.activity': { item: Activity, name: 'Activités', img: FiActivity, minW: 2, minH: 2 },
}

export default componentFactory
