import React from 'react'
const Clock = React.lazy(() => import('../Widgets/Clocks/Clock'))
const Meteo = React.lazy(() => import('../Widgets/Meteo/Meteo'))
const FlipClock = React.lazy(() => import('../Widgets/Clocks/FlipClock'))
const Calendar = React.lazy(() => import('../Widgets/Calendars/Calendar'))
const EmotionWidget = React.lazy(() => import('../Widgets/EmotionWidget/EmotionWidget'))
const Activity = React.lazy(() => import('../Widgets/Activities/Activity'))
const Drawing = React.lazy(() => import('../Widgets/Draw/Drawing'))
const Radio = React.lazy(() => import('../Widgets/Radio/Radio'))
const Todo = React.lazy(() => import('../Widgets/Todo/Todo'))
const WhiteNoise = React.lazy(() => import('../Widgets/WhiteNoise/WhiteNoise'))
const Youtube = React.lazy(() => import('../Widgets/Youtube/Youtube'))

import weather from '../../../public/img/Weather_Isometric.svg'
import analogue from '../../../public/img/Time_Monochromatic.svg'
import numeric from '../../../public/img/Iwatch_Two Color.svg'
import youtube from '../../../public/img/youtube.svg'
import calendar from '../../../public/img/Calendar_Flatline.svg'
import emotion from '../../../public/img/Happy_face_Two Color.svg'
import activity from '../../../public/img/Completed_activity_Outline.svg'
import radio from '../../../public/img/Radio_Presenter_Monochromatic.svg'
import task from '../../../public/img/Completed_task _Two Color.svg'
import draw from '../../../public/img/Creative_Process _Monochromatic.svg'
import beach from '../../../public/img/Beach_Monochromatic.svg'

const componentFactory = {
	'com.miemo.widgets.meteo': { item: Meteo, name: 'Météo', img: weather, minW: 2, minH: 2 },
	'com.miemo.widgets.clock': { item: Clock, name: 'Horloge analogique', img: analogue, minW: 1, minH: 1 },
	'com.miemo.widgets.flipClock': {
		item: FlipClock,
		name: 'Horloge numérique',
		img: numeric,
		minW: 2,
		minH: 1,
	},
	'com.miemo.widgets.youtube': { item: Youtube, name: 'Youtube', img: youtube, minW: 3, minH: 2 },
	'com.miemo.widgets.calendar': { item: Calendar, name: 'Calendrier', img: calendar, minW: 4, minH: 2 },
	'com.miemo.widgets.emotionWidget': {
		item: EmotionWidget,
		name: "Détection d'émotions",
		img: emotion,
		minW: 2,
		minH: 6,
	},
	'com.miemo.widgets.activity': { item: Activity, name: 'Activités', img: activity, minW: 2, minH: 2 },
	'com.miemo.widgets.radio': { item: Radio, name: 'Radio', img: radio, minW: 4, minH: 4 },
	'com.miemo.widgets.todo': { item: Todo, name: 'Tâches', img: task, minW: 2, minH: 2 },
	'com.miemo.widgets.Drawing': { item: Drawing, name: 'Dessin', img: draw, minW: 2, minH: 2 },
	'com.miemo.widgets.WhiteNoise': {
		item: WhiteNoise,
		name: 'Sons blancs',
		img: beach,
		minW: 2,
		minH: 2,
	},
}

export default componentFactory
