import { React, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ReactSketchCanvas } from 'react-sketch-canvas'

import ColorModal from './ColorModal'
import KeyboardedInput from '../../layout/KeyboardedInput'

import { BiUndo, BiRedo, BiEraser, BiPaint, BiColorFill } from 'react-icons/bi'
import AccentedButton from '../../ui/AccentedButton'

const ICON_SIZE = '1.4em'

function ReactDrawing() {
	const [color, setColor] = useState('black')
	const [canvasColor, setCanvasColor] = useState('white')
	const [strokeWidth, setStrokeWidth] = useState(10)

	const [pencilColorVisible, setPencilColorVisible] = useState(false)
	const [modalFillColorVisible, setModalFillColorVisible] = useState(false)

	const canvas = useRef()

	const undoButtonClick = () => {
		canvas.current.undo()
	}
	const redoButtonClick = () => {
		canvas.current.redo()
	}
	const clearButtonClick = () => {
		canvas.current.resetCanvas()
	}

	return (
		<BigBox className="h-100 d-flex flex-column">
			<ReactSketchCanvas ref={canvas} canvasColor={canvasColor} strokeColor={color} strokeWidth={strokeWidth} />
			<div className="d-flex justify-content-between align-content-between w-100 flex-wrap">
				<KeyboardedInput
					setValue={value => setStrokeWidth(value)}
					value={`${strokeWidth}`}
					defaultKeyboard="numbers"
					className="w-25"
					variant={'dark'}
				/>
				<ColorModal
					ResultModalVisible={modalFillColorVisible || pencilColorVisible}
					setResultModalVisible={modalFillColorVisible ? setModalFillColorVisible : setPencilColorVisible}
					setColor={modalFillColorVisible ? setCanvasColor : setColor}
					color={modalFillColorVisible ? canvasColor : color}
				/>
				<AccentedButton onClick={() => setModalFillColorVisible(!modalFillColorVisible)} className="p-2">
					<BiColorFill size={ICON_SIZE} />
				</AccentedButton>
				<AccentedButton onClick={() => setPencilColorVisible(!pencilColorVisible)} className="p-2">
					<BiPaint size={ICON_SIZE} />
				</AccentedButton>
				<AccentedButton onClick={clearButtonClick} className="p-2">
					<BiEraser size={ICON_SIZE} />
				</AccentedButton>
				<AccentedButton onClick={undoButtonClick} className="p-2">
					<BiUndo size={ICON_SIZE} />
				</AccentedButton>

				<AccentedButton onClick={redoButtonClick} className="p-2">
					<BiRedo size={ICON_SIZE} />
				</AccentedButton>
			</div>
		</BigBox>
	)
}

ReactDrawing.propTypes = {
	size: PropTypes.shape({
		height: PropTypes.number,
		width: PropTypes.number,
		border: PropTypes.string,
		borderRadius: PropTypes.string,
	}),
}

ReactDrawing.defaultProps = {
	border: '0.0625rem solid #9c9c9c',
	borderRadius: '0.25rem',
}

const BigBox = styled.div`
	width: 100%;
	margin-right: 2%;
`

export default ReactDrawing
