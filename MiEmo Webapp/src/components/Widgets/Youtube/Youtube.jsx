import React, { useState } from 'react'
import Home from './Home'
import YoutbeHeader from './components/YoutbeHeader'
import styled from 'styled-components'

function Youtube() {
	const [video, setVideo] = useState({})

	return (
		<DivContainer className="h-100 w-100">
			<YoutbeHeader setVideo={setVideo} isModalDisplay={true} />
			<Home video={video} />
		</DivContainer>
	)
}

const DivContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flexStart;
`

export default Youtube
