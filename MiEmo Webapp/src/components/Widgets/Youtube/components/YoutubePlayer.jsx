import React, { Suspense } from 'react'
const ReactYoutube = React.lazy(() => import('react-youtube'))
import { withSize } from 'react-sizeme'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import NoVideo from './NoVideo'

function YoutubePlayer({ size, videoId }) {
	const opts = {
		height: size.height,
		width: size.width,
		color: '#ffd400',
		playerVars: {
			autoplay: 1,
		},
	}

	const _onReady = event => {
		event.target.pauseVideo()
	}

	return (
		<DivContainer>
			<Suspense fallback={<NoVideo />}>
				<ReactYoutube videoId={videoId} opts={opts} onReady={_onReady} />
			</Suspense>
		</DivContainer>
	)
}

YoutubePlayer.propTypes = {
	videoId: PropTypes.string.isRequired,
	size: PropTypes.shape({
		height: PropTypes.number,
		width: PropTypes.number,
	}),
}

const DivContainer = styled.div`
	height: 100%;
	margin-bottom: 5px;
`

export default withSize({ monitorHeight: true })(React.memo(YoutubePlayer))
