import React from 'react'
const ReactYoutube = React.lazy(() => import('react-youtube'))
import { withSize } from 'react-sizeme'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function YoutubePlayer({ size }) {
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
			<ReactYoutube videoId="5a4aErcGMaU" opts={opts} onReady={_onReady} />
		</DivContainer>
	)
}

YoutubePlayer.propTypes = {
	size: PropTypes.shape({
		height: PropTypes.number,
		width: PropTypes.number,
	}),
}

const DivContainer = styled.div`
	height: 80%;
	marginbottom: 5px;
`

export default withSize({ monitorHeight: true })(YoutubePlayer)
