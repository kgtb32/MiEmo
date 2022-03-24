import React, { useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { withSize } from 'react-sizeme'

import Webcam from 'react-webcam'

import api from '../../../api/'
import settings from '../../../settings/settings'

function VideoWidget({ size, shotEvent, setEmotion }) {
	const camRef = useRef(null)
	const makeScreenshot = useCallback(() => {
		const fetch = async () => {
			return api.emotion.detect(camRef.current.getScreenshot())
		}
		fetch().then(({ emotion }) => setEmotion(emotion))
	}, [camRef])

	useEffect(() => {
		shotEvent.on('shot', () => {
			makeScreenshot()
		})
	}, [shotEvent])

	return (
		<div className="h-100">
			<Webcam
				ref={camRef}
				audio={false}
				screenshotQuality={1}
				screenshotFormat="image/png"
				imageSmoothing={true}
				forceScreenshotSourceSize={true}
				mirrored={settings?.emotionDetection?.mirorred ?? true}
				style={{
					width: size.width + 'px',
					height: size.height + 'px',
					position: 'absolute',
					top: '0',
					left: '0',
					padding: '0px',
					border: '1px solid transparent',
					borderRadius: '8px',
					objectFit: settings?.emotionDetection?.cameraCoverMode ?? 'cover',
				}}
			/>
		</div>
	)
}

VideoWidget.propTypes = {
	size: PropTypes.shape({
		height: PropTypes.number,
		width: PropTypes.number,
	}),
	shotEvent: PropTypes.any,
	setEmotion: PropTypes.func,
}

export default withSize({ monitorHeight: true })(VideoWidget)
