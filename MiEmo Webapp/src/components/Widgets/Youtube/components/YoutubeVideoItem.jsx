import React, { useState } from 'react'
import { Image } from 'primereact/image'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const YoutubeVideoItem = ({ data, setVideo }) => {
	const [error, setError] = useState(false)

	const isNotUnDefined = (value, entitled) => {
		switch (entitled) {
			case 'Image':
				return !error && value != undefined ? value : '/public/img/noimage.svg'
			case 'SimpleText':
				return value != undefined ? value : '0'
			case 'Title':
				return value != undefined ? value : 'Aucun titre'
			case 'ChannelTitle':
				return value != undefined ? value : 'Aucun nom de channel'
			case 'Label':
				return value != undefined ? value : '0'
			default:
				return <></>
		}
	}

	return (
		<YoutubeVideoItemContainer onClick={() => setVideo(data)}>
			<YoutubeImage
				src={isNotUnDefined(data?.thumbnail?.thumbnails[0]?.url, 'Image')}
				alt="Image"
				onError={() => setError(true)}
			/>
			<YoutubeTime>{isNotUnDefined(data?.length?.simpleText, 'SimpleText')}</YoutubeTime>
			<YoutubeText>
				<YoutubeTitle>{isNotUnDefined(data?.title, 'Title')}</YoutubeTitle>
				<YoutubeViews>
					{isNotUnDefined(data?.channelTitle, 'ChannelTitle')} • durée
					{' ' + isNotUnDefined(data?.length?.accessibility?.accessibilityData?.label, 'Label')}
				</YoutubeViews>
			</YoutubeText>
		</YoutubeVideoItemContainer>
	)
}

YoutubeVideoItem.propTypes = {
	data: PropTypes.object.isRequired,
	setVideo: PropTypes.func.isRequired,
}

YoutubeVideoItem.defaultProps = {
	setVideo: () => '',
}

const YoutubeVideoItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;
	border: 2px solid #2f2f2f;
	border-radius: 10px;
	&:hover {
		border: 2px solid red;
		border-radius: 10px;
	}
`
const YoutubeImage = styled(Image)`
	width: 40%;
	${'img'} {
		width: 100%;
		height: 160px;
		border-radius: 10px;
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
	overflow: hidden;
	text-overflow: ellipsis;
	max-height: 71px;
`

const YoutubeTime = styled.div`
	overflow: hidden;
	width: 40px;
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
	text-overflow: ellipsis;
`
export default React.memo(YoutubeVideoItem)
