import React from 'react'
import PropTypes from 'prop-types'

import { ListGroup, Modal } from 'react-bootstrap'

import { AiFillCamera } from 'react-icons/ai'

function WebcamSelector({ setSelectedVideoDevice, videoDevices, setModalVisible, modalVisible }) {
	return (
		<Modal className="no-drag" show={modalVisible} onHide={() => setModalVisible(false)}>
			<Modal.Header closeButton className="bg-dark">
				<Modal.Title>Sélectionner une caméra</Modal.Title>
			</Modal.Header>
			<Modal.Body className="bg-dark">
				<p className="text-center">Sélectionnez une caméra depuis la liste de caméra suivante</p>
				<ListGroup defaultActiveKey="">
					{videoDevices.map(({ label, deviceId }, i) => {
						return (
							<ListGroup.Item
								onClick={() => {
									setSelectedVideoDevice({ deviceId })
									setModalVisible(false)
								}}
								action
								key={'video_select_' + i}
							>
								<AiFillCamera />
								<span className="mx-2">{label ?? `Caméra ${i}`}</span>
							</ListGroup.Item>
						)
					})}
				</ListGroup>
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</Modal>
	)
}

WebcamSelector.propTypes = {
	setSelectedVideoDevice: PropTypes.func,
	videoDevices: PropTypes.array,
	setModalVisible: PropTypes.func,
	modalVisible: PropTypes.bool,
}

export default WebcamSelector
