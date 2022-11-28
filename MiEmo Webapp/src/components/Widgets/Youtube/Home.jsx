import React from 'react'
import PropTypes from 'prop-types'
import YoutubePlayer from './components/YoutubePlayer'
import NoVideo from './components/NoVideo'

const Home = ({ video }) => {
	return (
		<div className="h-100 w-100 mt-1">
			{Object.keys(video).length != 0 ? <YoutubePlayer videoId={video.id} /> : <NoVideo size={'100%'} />}
		</div>
	)
}

Home.propTypes = {
	video: PropTypes.object.isRequired,
}

Home.defaultProps = {
	video: () => {},
}

export default React.memo(Home)
