import React from 'react'
import { Image } from 'primereact/image'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const YoutubeVideoItem = data => {
	const extract = publishedAt => {
		return publishedAt.match(/\d/g).join('')
	}

	return (
		<YoutubeVideoItemContainer>
			<YoutubeImage src={data.data.snippet.thumbnails.high.url} alt="Image" />
			<YoutubeTime>{data.data.duration_raw}</YoutubeTime>
			<YoutubeText>
				<YoutubeTitle>{data.data.title}</YoutubeTitle>
				<YoutubeViews>
					{data.data.snippet.views} vues • il y a {extract(data.data.snippet.publishedAt)} ans
				</YoutubeViews>
				<YoutubeViews>{data.data.description}</YoutubeViews>
			</YoutubeText>
		</YoutubeVideoItemContainer>
	)
}

YoutubeVideoItem.propTypes = {
	data: PropTypes.object.isRequired,
}

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
