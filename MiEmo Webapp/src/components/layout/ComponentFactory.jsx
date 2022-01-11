import React from 'react'

import Meteo from '../Widgets/Meteo/Meteo'

const componentFactory = {
	'com.miemo.widgets.clock': () => (
		<>
			<p>item</p>
		</>
	),
	'com.miemo.widgets.meteo': Meteo,
}

export default componentFactory
