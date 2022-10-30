import React from 'react'
import { BsYoutube } from 'react-icons/bs'
import styled from 'styled-components'
import PropTypes from 'prop-types'
const SearchYoutubeModal = React.lazy(() => import('../components/SearchYoutubeModal'))

const YoutbeHeader = props => {
	return (
		<DivContainer>
			<div className="d-flex">
				<BsYoutube className="my-auto" color="red" size="2em" />
				<YoutubeText className="my-auto">Youtube</YoutubeText>
			</div>
			{props.isModalDisplay ? (
				<DivModal>
					<SearchYoutubeModal setVideo={props.setVideo} />
				</DivModal>
			) : (
				<span />
			)}
		</DivContainer>
	)
}

YoutbeHeader.propTypes = {
	isModalDisplay: PropTypes.bool.isRequired,
	setVideo: PropTypes.func.isRequired,
}

YoutbeHeader.defaultProps = {
	setVideo: () => '',
	isModalDisplay: false,
}

const DivContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-right: 8px;
	padding-left: 8px;
	height: 12%;
`

const YoutubeText = styled.div`
	margin: 0;
	font-weight: bold;
	color: white;
	margin-left: 5px;
`

const DivModal = styled.div`
	color: black;
`

export default React.memo(YoutbeHeader)
