import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import './static/css/MiEmoStrap.css'

import 'flag-icons/css/flag-icons.min.css'

import 'primereact/resources/primereact.css'

import 'rc-slider/assets/index.css'

import 'bootstrap-dark-5/dist/css/bootstrap-night.css'

import 'primeicons/primeicons.css'

import { StoreProvider } from './context/StoreContext'

ReactDOM.render(
	<React.StrictMode>
		<StoreProvider>
			<App />
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById('root'),
)
