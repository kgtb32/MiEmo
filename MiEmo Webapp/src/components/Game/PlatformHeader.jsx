import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import ReactHowler from 'react-howler'

import apis from '../../api'
import settings from '../../settings/settings'

export default function PlatformHeader({ platformUuid, playMusic }) {
	const [platformInfos, setPlatformInfos] = useState(null)

	useEffect(() => {
		apis.game.getPlatform(platformUuid).then(setPlatformInfos).catch()
	}, [platformUuid])

	return (
		<>
			{!!platformInfos?.music && (
				<ReactHowler
					playing={playMusic}
					loop={true}
					src={platformInfos.music}
					volume={settings.game.musicVolume / 100}
				/>
			)}
			{platformInfos?.console_logo != '' && !!platformInfos?.console_logo && (
				<div className="h-auto w-100 d-flex justify-content-center">
					<img src={platformInfos?.console_logo} className="w-auto h-8" />
				</div>
			)}
		</>
	)
}

PlatformHeader.propTypes = {
	platformUuid: PropTypes.string.isRequired,
	playMusic: PropTypes.bool.isRequired,
}

PlatformHeader.defaultProps = {
	playMusic: false,
}
