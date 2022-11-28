import React, { Suspense } from 'react'
const ReactYoutube = React.lazy(() => import('react-youtube'))
import PropTypes from 'prop-types'
import NoVideo from './NoVideo'

function YoutubePlayer({ videoId }) {
	const opts = {
		color: '#ffd400',
		playerVars: {
			autoplay: 1,
		},
	}

	const _onReady = event => {
		event.target.pauseVideo()
	}

	return (
		<div className="h-100 w-100 mb-1">
			<Suspense fallback={<NoVideo />}>
				<ReactYoutube
					videoId={videoId}
					opts={opts}
					onReady={_onReady}
					iframeClassName="h-100 w-100"
					className="h-100 w-100"
				/>
			</Suspense>
		</div>
	)
}

YoutubePlayer.propTypes = {
	videoId: PropTypes.string.isRequired,
	size: PropTypes.shape({
		height: PropTypes.number,
		width: PropTypes.number,
	}),
}

export default React.memo(YoutubePlayer)
