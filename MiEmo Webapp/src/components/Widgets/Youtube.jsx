import React from 'react'
const Youtube = React.lazy(() => import('react-youtube'))
import { withSize } from 'react-sizeme'
import PropTypes from 'prop-types'
function ReactYoutube({ size }) {
	const youtubeSize = {
		height: size.height,
		width: size.width,
	}
	return (
		<div className="h-100">
			<Youtube videoId="2g811Eo7K8U" opts={youtubeSize} />
		</div>
	)
}

ReactYoutube.propTypes = {
	size: PropTypes.shape({
		height: PropTypes.number,
		width: PropTypes.number,
	}),
}

export default withSize({ monitorHeight: true })(ReactYoutube)
