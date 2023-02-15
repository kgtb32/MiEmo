import React, { useEffect } from 'react'
import VideoWidget from '../components/Widgets/EmotionWidget/VideoWidget'
import SettingsHeader from '../components/Settings/SettingsHeader'

import { EventEmitter } from 'events'
import apis from '../api'

export default function ShadowMe() {
	useEffect(() => {
		apis.hologram.setHoloMode('video').then().catch()

		return () => {
			apis.hologram.setHoloMode('base').then().catch()
		}
	}, [])

	return (
		<div className="hv-100 d-flex flex-column p-4" style={{ background: 'black' }}>
			<SettingsHeader headerTitle="Shadow Me" backUrl="/" />
			<div className="flex-grow-1">
				<VideoWidget shotEvent={new EventEmitter()} setEmotion={() => void 0} setModalVisible={() => void 0} />
			</div>
		</div>
	)
}
