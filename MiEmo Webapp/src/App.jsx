import { React } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Settings from './pages/Settings'
import Page404 from './pages/Page404'

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/*" element={<Page404 />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
