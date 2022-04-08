import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'primereact/button'

import { EventEmitter } from 'events'

const VideoWidget = React.lazy(() => import('./VideoWidget'))
const WebcamSelector = React.lazy(() => import('./WebcamSelector'))
const ResultModal = React.lazy(() => import('./ResultModal'))

import { AiFillCamera } from 'react-icons/ai'
import { MdCameraswitch } from 'react-icons/md'

const shotEvent = new EventEmitter()

function EmotionWidget() {
	const [devices, setDevices] = useState([])
	const [selectedVideoDevice, setSelectedVideoDevice] = useState('')
	const [modalCameraSelectVisible, setModalCameraSelectVisible] = useState(false)
	const [modalResultVisible, setModalResultVisible] = useState(false)
	const [emotion, setEmotion] = useState(null)

	const searchDevices = React.useCallback(
		mediaDevices => setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
		[setDevices],
	)

	React.useEffect(() => {
		navigator.mediaDevices.enumerateDevices().then(searchDevices)
	}, [searchDevices])

	return (
		<div className="w-100 h-100 d-flex flex-column">
			<WebcamSelector
				selectedVideoDevice={selectedVideoDevice}
				videoDevices={devices}
				setSelectedVideoDevice={setSelectedVideoDevice}
				setModalVisible={setModalCameraSelectVisible}
				modalVisible={modalCameraSelectVisible}
			/>
			<ResultModal
				ResultModalVisible={modalResultVisible}
				setResultModalVisible={setModalResultVisible}
				emotion={emotion}
			/>
			<div className="h-100">
				<VideoWidget shotEvent={shotEvent} setEmotion={setEmotion} setModalVisible={setModalResultVisible} />
			</div>
			<div className="mx-auto">
				<JoliButton icon="pi" className="p-button-rounded mx-auto mt-2" onClick={() => shotEvent.emit('shot')}>
					<AiFillCamera size="1.5em" />
				</JoliButton>
				<JoliButton
					onClick={() => setModalCameraSelectVisible(true)}
					icon="pi"
					className="p-button-rounded mx-auto mt-2"
					style={{ marginLeft: '2em !important' }}
				>
					<MdCameraswitch size="1.5em" />
				</JoliButton>
			</div>
		</div>
	)
}

const JoliButton = styled(Button)`
	margin-left: 1em !important;
	margin-right: 1em !important;
`

export default EmotionWidget
