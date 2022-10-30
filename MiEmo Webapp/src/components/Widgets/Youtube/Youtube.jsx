import React, { useState } from 'react'
import YoutubeNavBar from './components/YoutubeNavBar'
import Search from './pages/Search'
import History from './pages/History'
import Favorites from './pages/Favorites'
import YoutbeHeader from './components/YoutbeHeader'
import styled from 'styled-components'

function Youtube() {
	const [navItemChange, setNavItemChange] = useState({ history: false, search: true, favorites: false })

	return (
		<DivContainer className="h-100 w-100">
			<YoutbeHeader isSearch={navItemChange.search} />
			{navItemChange.search && <Search />}
			{navItemChange.history && <History />}
			{navItemChange.favorites && <Favorites />}
			<YoutubeNavBar setNavItemChange={setNavItemChange} />
		</DivContainer>
	)
}

const DivContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flexStart;
`

export default Youtube
