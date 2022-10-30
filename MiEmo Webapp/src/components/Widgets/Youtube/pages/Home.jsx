import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import YoutubePlayer from '../components/YoutubePlayer'
import NoVideo from '../components/NoVideo'

const Home = ({ video }) => {
	return (
		<DivContainer>
			{Object.keys(video).length != 0 ? <YoutubePlayer videoId={video.id} /> : <NoVideo size={'100%'} />}
		</DivContainer>
	)
}

Home.propTypes = {
	video: PropTypes.object.isRequired,
}

Home.defaultProps = {
	video: () => {},
}

const DivContainer = styled.div`
	height: 68%;
	margin-bottom: 5px;
`

export default React.memo(Home)
