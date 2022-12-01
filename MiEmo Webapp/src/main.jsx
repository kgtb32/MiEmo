import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import ErrorBoundary from './components/Errors/ErrorBoundary'

import './static/css/MiEmoStrap.css'

import 'flag-icons/css/flag-icons.min.css'

import 'primereact/resources/primereact.css'

import 'primereact/resources/themes/lara-dark-teal/theme.css'

import 'rc-slider/assets/index.css'

import 'bootstrap-dark-5/dist/css/bootstrap-night.css'

import 'primeicons/primeicons.css'

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'

import { StoreProvider } from './context/StoreContext'
import { KeyboardProvider } from './context/KeyboardContext'
import { GameProvider } from './context/GameContext'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<StoreProvider>
			<KeyboardProvider>
				<GameProvider>
					<ErrorBoundary>
						<App />
					</ErrorBoundary>
				</GameProvider>
			</KeyboardProvider>
		</StoreProvider>
	</React.StrictMode>,
)
