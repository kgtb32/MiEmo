import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'react-bootstrap'

import { BiHappyAlt } from 'react-icons/bi'
import { ImWondering2 } from 'react-icons/im'
import { FaAngry, FaGrimace, FaSadTear, FaSurprise } from 'react-icons/fa'
import { BsEmojiNeutralFill } from 'react-icons/bs'

const ICON_SIZE = '3.5em'
const ICON_CLASS_NAMES = 'mx-auto w-100'

function ResultModal({ ResultModalVisible, setResultModalVisible, emotion }) {
	const Emotions = {
		angry: () => <FaAngry size={ICON_SIZE} className={ICON_CLASS_NAMES} />,
		disgusted: () => <ImWondering2 size={ICON_SIZE} className={ICON_CLASS_NAMES} />,
		fearful: () => <FaGrimace size={ICON_SIZE} className={ICON_CLASS_NAMES} />,
		happy: () => <BiHappyAlt size={ICON_SIZE} className={ICON_CLASS_NAMES} />,
		neutral: () => <BsEmojiNeutralFill size={ICON_SIZE} className={ICON_CLASS_NAMES} />,
		sad: () => <FaSadTear size={ICON_SIZE} className={ICON_CLASS_NAMES} />,
		surprised: () => <FaSurprise size={ICON_SIZE} className={ICON_CLASS_NAMES} />,
	}

	const EmotionItem = Emotions[emotion?.toLowerCase()] ?? Emotions.neutral
	return (
		<Modal className="no-drag" show={ResultModalVisible} onHide={() => setResultModalVisible(false)}>
			<Modal.Header closeButton className="bg-dark">
				<Modal.Title>Émotion detectée</Modal.Title>
			</Modal.Header>
			<Modal.Body className="bg-dark">
				<p>Émotion detectée : {emotion}</p>
				<EmotionItem />
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</Modal>
	)
}

ResultModal.propTypes = {
	ResultModalVisible: PropTypes.bool,
	setResultModalVisible: PropTypes.func,
	emotion: PropTypes.string,
}

export default ResultModal
