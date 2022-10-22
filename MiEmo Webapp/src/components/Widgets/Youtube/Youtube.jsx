import React from 'react'
const YoutubePlayer = React.lazy(() => import('./YoutubePlayer'))
const YoutubeNavBar = React.lazy(() => import('./YoutubeNavBar'))

function Youtube() {
	return (
		<div className="h-100 w-100" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flexStart' }}>
			<YoutubePlayer />
			<YoutubeNavBar />
		</div>
	)
}

export default Youtube
