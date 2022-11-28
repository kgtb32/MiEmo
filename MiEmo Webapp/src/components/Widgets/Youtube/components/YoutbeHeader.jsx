import React from 'react'
import { BsYoutube } from 'react-icons/bs'
import styled from 'styled-components'
import PropTypes from 'prop-types'
const SearchYoutubeModal = React.lazy(() => import('../components/SearchYoutubeModal'))

const YoutbeHeader = ({ isModalDisplay, setVideo }) => {
	return (
		<div className="w-100 d-flex flex-row justify-content-between px-1">
			<div className="d-flex">
				<BsYoutube className="my-auto" color="red" size="2em" />
				<YoutubeText className="my-auto">Youtube</YoutubeText>
			</div>
			{isModalDisplay ? (
				<DivModal>
					<SearchYoutubeModal setVideo={setVideo} />
				</DivModal>
			) : (
				<span />
			)}
		</div>
	)
}

YoutbeHeader.propTypes = {
	isModalDisplay: PropTypes.bool.isRequired,
	setVideo: PropTypes.func.isRequired,
}

YoutbeHeader.defaultProps = {
	setVideo: () => void 0,
	isModalDisplay: false,
}

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
