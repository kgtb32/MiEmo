import React, { useState } from 'react'
import YoutubeNavBar from './components/YoutubeNavBar'
import Search from './pages/Home'
import YoutbeHeader from './components/YoutbeHeader'
import styled from 'styled-components'

function Youtube() {
	const [video, setVideo] = useState({})

	return (
		<DivContainer className="h-100 w-100">
			<YoutbeHeader setVideo={setVideo} isModalDisplay={true} />
			<Search video={video} />
			<YoutubeNavBar />
		</DivContainer>
	)
}

const DivContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flexStart;
`

export default Youtube
