import { React, useState, useRef } from 'react'
import { withSize } from 'react-sizeme'
import PropTypes from 'prop-types'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'

function ReactDrawing(size) {
	const [color, setColor] = useState('black')
	const [canvasColor, setCanvasColor] = useState('white')
	const canvas = useRef()
	const [strokeWidth, setStrokeWidth] = useState(10)

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
			<Aranger>
				<ColorBox>
					<div>
						Pencil color
						<Form.Control type="color" defaultValue="black" onChange={e => setColor(e.target.value)} />
					</div>
					<div>
						Canvas Color
						<Form.Control
							type="color"
							defaultValue="#FFFAFA"
							onChange={e => setCanvasColor(e.target.value)}
						/>
					</div>
				</ColorBox>

				<PencilSize>
					strokeWidth
					<input
						type="number"
						min="1"
						max="100"
						value={strokeWidth}
						onChange={e => setStrokeWidth(e.target.value, 10)}
					/>
				</PencilSize>
				<OptionsCanvas>
					<div>
						<button onClick={undoButtonClick}>Undo</button>
					</div>
					<div>
						<button onClick={redoButtonClick}>Redo</button>
					</div>
					<div>
						<button onClick={clearButtonClick}>Clear</button>
					</div>
				</OptionsCanvas>
			</Aranger>
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
`

const Aranger = styled.div`
	width: 100%;
	height: 30%;
	display: flex;
`
const ColorBox = styled.div`
	width: 25%;
`
const PencilSize = styled.div`
	width: 25%;
`
const OptionsCanvas = styled.div`
	width: 50%;
	display: flex;
`

export default withSize({ monitorHeight: true })(ReactDrawing)
