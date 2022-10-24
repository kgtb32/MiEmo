import React, { useState } from 'react'
import YoutubeNavBar from './components/YoutubeNavBar'
import Search from './pages/Search'
import History from './pages/History'
import Favorites from './pages/Favorites'
import YoutbeHeader from './components/YoutbeHeader'

function Youtube() {
	const [navItemChange, setNavItemChange] = useState({ history: false, search: true, favorites: false })

	return (
		<div className="h-100 w-100" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flexStart' }}>
			<YoutbeHeader />
			{navItemChange.search && <Search />}
			{navItemChange.history && <History />}
			{navItemChange.favorites && <Favorites />}
			<YoutubeNavBar setNavItemChange={setNavItemChange} />
		</div>
	)
}

export default Youtube
