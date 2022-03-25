import React from 'react'
const Youtube = React.lazy(() => import('react-youtube'))
import { withSize } from 'react-sizeme'
import PropTypes from 'prop-types'

import SearchBar from './SearchBar'
import { name } from 'dayjs/locale/fr'

function ReactYoutube({ size }) {
	const youtubeSize = {
		height: size.height,
		width: size.width,
	}
	return (
		<div className="h-100">
			<SearchBar name={name} videoId={name} />
			<Youtube videoId={SearchBar.name} opts={youtubeSize} />
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
