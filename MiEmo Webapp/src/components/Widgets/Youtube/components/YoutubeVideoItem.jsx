import React from 'react'
import { Image } from 'primereact/image'
import { ScrollPanel } from 'primereact/scrollpanel'
import mock from '../../../../api/mock/youtube/youtube.json'
import styled from 'styled-components'

const YoutubeVideoItem = () => {
	const extract = publishedAt => {
		return publishedAt.match(/\d/g).join('')
	}

	return (
		<ScrollPanelCustom className="custombar1">
			<YoutubeVideoItemContainer>
				<YoutubeImage src={mock[0].snippet.thumbnails.high.url} alt="Image" />
				<YoutubeTime>{mock[0].duration_raw}</YoutubeTime>
				<YoutubeText>
					<YoutubeTitle>{mock[0].title}</YoutubeTitle>
					<YoutubeViews>
						{mock[0].snippet.views} vues • il y a {extract(mock[0].snippet.publishedAt)} ans
					</YoutubeViews>
					<YoutubeViews>{mock[0].description}</YoutubeViews>
				</YoutubeText>
			</YoutubeVideoItemContainer>
		</ScrollPanelCustom>
	)
}

// YoutubeVideoItem
const ScrollPanelCustom = styled(ScrollPanel)`
	width: 100%;
	max-height: 65vh;
	${'.p-scrollpanel-content'} {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-content: flex-start;
		justify-content: flex-start;
	}
	${'.p-scrollpanel-bar'} {
		background: red;
	}
`
const YoutubeVideoItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
`
const YoutubeImage = styled(Image)`
	width: 40%;
	${'img'} {
		width: 100%;
		height: 160px;
		border-radius: 10px;
		margin-bottom: 10px;
	}
`

const YoutubeText = styled.div`
	width: 60%;
	height: 100%;
	padding-bottom: 10px;
`
const YoutubeTitle = styled.p`
	font-family: 'Roboto', 'Arial', sans-serif;
	font-size: 18px;
	font-weight: 400;
	white-space: normal;
	margin: 0px;
`
const YoutubeViews = styled.p`
	font-family: 'Roboto', 'Arial', sans-serif;
	font-size: 12px;
	font-weight: 400;
	white-space: normal;
	margin: 0px;
	color: grey;
	${'' /* white-space: nowrap; */}
	overflow: hidden;
	text-overflow: ellipsis;
	max-height: 71px;
`

const YoutubeTime = styled.div`
	overflow: hidden;
	width: 35px;
	background-color: #0f2227;
	border-radius: 5px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	font-weight: 500;
	position: relative;
	right: 40px;
	top: 60px;
	overflow: hidden;
	text-overflow: ellipsis;
`
export default YoutubeVideoItem
