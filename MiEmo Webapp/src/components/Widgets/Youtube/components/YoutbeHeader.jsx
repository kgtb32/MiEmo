import React from 'react'
import { BsYoutube } from 'react-icons/bs'
import styled from 'styled-components'

const YoutbeHeader = () => {
	return (
		<DivContainer>
			<BsYoutube color="red" size={30} style={{ flexGrow: 1 }} />
			<YoutubeText>Youtube</YoutubeText>
		</DivContainer>
	)
}

const DivContainer = styled.div`
	display: flex;
	background-color: white;
`
const YoutubeText = styled.div`
	margin: 0;
	font-weight: bold;
	color: black;
	flex-grow: 19;
`

export default YoutbeHeader
