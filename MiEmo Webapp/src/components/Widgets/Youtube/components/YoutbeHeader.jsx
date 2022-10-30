import React from 'react'
import { BsYoutube } from 'react-icons/bs'
import styled from 'styled-components'
import PropTypes from 'prop-types'
const SearchYoutubeModal = React.lazy(() => import('../components/SearchYoutubeModal'))

const YoutbeHeader = props => {
	return (
		<DivContainer>
			<DivYoutube>
				<BsYoutube color="red" size={30} />
				<YoutubeText>Youtube</YoutubeText>
			</DivYoutube>
			{props.isSearch ? (
				<DivModal>
					<SearchYoutubeModal />
				</DivModal>
			) : (
				<span />
			)}
		</DivContainer>
	)
}

YoutbeHeader.propTypes = {
	isSearch: PropTypes.bool.isRequired,
}

const DivContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-right: 8px;
	padding-left: 8px;
`

const DivYoutube = styled.div`
	display: flex;
	alignitems: center;
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

export default YoutbeHeader
