import { React } from 'react'
import { Modal } from 'react-bootstrap'
import { HexColorPicker } from 'react-colorful'
import PropTypes from 'prop-types'

function ColorModal({ ResultModalVisible, setResultModalVisible, setColor, color }) {
	return (
		<Modal className="no-drag" show={ResultModalVisible} onHide={() => setResultModalVisible(false)}>
			<Modal.Header closeButton className="bg-dark">
				<Modal.Title>Couleur</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ margin: 'auto' }} className="bg-dark">
				<HexColorPicker color={color} onChange={setColor} />
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</Modal>
	)
}

ColorModal.propTypes = {
	setResultModalVisible: PropTypes.func,
	ResultModalVisible: PropTypes.bool,
	setColor: PropTypes.func,
	color: PropTypes.string,
}

export default ColorModal
