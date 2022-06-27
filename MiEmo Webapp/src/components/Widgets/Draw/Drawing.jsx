import { React, useState, useRef } from 'react'
import { withSize } from 'react-sizeme'
import PropTypes from 'prop-types'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { Button } from 'primereact/button'
import styled from 'styled-components'
import { BiUndo, BiRedo, BiEraser, BiPaint, BiColorFill } from 'react-icons/bi'
import { InputText } from 'primereact/inputtext'
import ColorModal from './ColorModal'

function ReactDrawing(size) {
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

	const drawingBorderSize = {
		height: size.height,
		width: size.width,
		border: size.border,
		borderRadius: size.borderRadius,
	}

	return (
		<BigBox className="h-100">
			<ReactCanvas>
				<ReactSketchCanvas
					ref={canvas}
					canvasColor={canvasColor}
					opts={drawingBorderSize}
					strokeColor={color}
					strokeWidth={strokeWidth}
				/>
			</ReactCanvas>
			<div className="d-flex justify-content-around w-100">
				<>
					<div>
						<ColorModal
							ResultModalVisible={modalFillColorVisible || pencilColorVisible}
							setResultModalVisible={
								modalFillColorVisible ? setModalFillColorVisible : setPencilColorVisible
							}
							setColor={modalFillColorVisible ? setCanvasColor : setColor}
							color={modalFillColorVisible ? canvasColor : color}
						/>

						<Button onClick={() => setModalFillColorVisible(!modalFillColorVisible)}>
							<BiColorFill />
						</Button>
					</div>
					<div>
						<Button onClick={() => setPencilColorVisible(!pencilColorVisible)}>
							<BiPaint />
						</Button>
					</div>
				</>
				<>
					<InputText
						style={{ width: 'inherit' }}
						value={strokeWidth}
						onChange={e => setStrokeWidth(e.target.value)}
						onKeyDown={e => setStrokeWidth(e.target.value)}
						variant={'dark'}
					/>
				</>

				<>
					<div>
						<Button onClick={undoButtonClick}>
							<BiUndo />
						</Button>
					</div>
					<div>
						<Button onClick={redoButtonClick}>
							<BiRedo />
						</Button>
					</div>
					<div>
						<Button onClick={clearButtonClick}>
							<BiEraser />
						</Button>
					</div>
				</>
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

const ReactCanvas = styled.div`
	height: 70%;
`
const BigBox = styled.div`
	width: 100%;
	margin-right: 2%;
`

export default withSize({ monitorHeight: true })(ReactDrawing)
