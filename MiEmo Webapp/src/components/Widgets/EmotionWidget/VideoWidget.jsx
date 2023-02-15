import React, { useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import Webcam from 'react-webcam'

import api from '../../../api/'
import settings from '../../../settings/settings'

function VideoWidget({ shotEvent, setEmotion, setModalVisible }) {
	const camRef = useRef(null)
	const makeScreenshot = useCallback(() => {
		const fetch = async () => {
			return api.emotion.detect(camRef.current.getScreenshot())
		}
		fetch().then(({ emotion }) => {
			setEmotion(emotion)
			setModalVisible(true)
		})
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
				className="w-auto h-100 mw-100 mx-auto d-block"
				screenshotFormat="image/png"
				imageSmoothing={true}
				forceScreenshotSourceSize={true}
				mirrored={settings?.emotionDetection?.mirorred ?? true}
				style={{
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
	shotEvent: PropTypes.any,
	setEmotion: PropTypes.func,
	setModalVisible: PropTypes.func,
}

export default VideoWidget
