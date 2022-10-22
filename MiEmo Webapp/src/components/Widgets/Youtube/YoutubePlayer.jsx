import React from 'react'
const ReactYoutube = React.lazy(() => import('react-youtube'))
import { withSize } from 'react-sizeme'
import PropTypes from 'prop-types'

function YoutubePlayer({ size }) {
	const opts = {
		height: size.height,
		width: size.width,
		color: '#ffd400',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	}

	const _onReady = event => {
		// access to player in all event handlers via event.target
		event.target.pauseVideo()
	}

	return (
		<div style={{ height: '80%', marginBottom: '5px' }}>
			<ReactYoutube videoId="5a4aErcGMaU" opts={opts} onReady={_onReady} />
		</div>
	)
}

YoutubePlayer.propTypes = {
	size: PropTypes.shape({
		height: PropTypes.number,
		width: PropTypes.number,
	}),
}

export default withSize({ monitorHeight: true })(YoutubePlayer)
