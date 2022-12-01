import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ControlsSelector, { ControlsTypesList } from '../components/Game/ControlsSelector'

import { joystickEvent } from './joypadInstanceManager'

let lastTimestamp = 0
const delayBetweenJoystickEvents = 200
export default function JoypadUtils({ positions, buttonPressed, controlType }) {
	positions = { ...JoypadUtils.defaultProps.positions, ...positions }

	const executeMovementTrigger = {
		bottom: positions.yPosition + 1,
		top: positions.yPosition - 1,
		left: positions.xPosition - 1,
		right: positions.xPosition + 1,
	}

	const joystickMovedTrigger = direction => {
		lastTimestamp = Date.now()
		let movePosition = positions.yPosition
		let moveXPosition = positions.xPosition
		switch (direction) {
			case 'bottom':
				if (positions.yPosition < positions.yMax) movePosition = executeMovementTrigger.bottom
				break
			case 'top': {
				if (positions.yPosition > 0) movePosition = executeMovementTrigger.top
				break
			}
			case 'left':
				if (positions.xPosition > 0) moveXPosition = executeMovementTrigger.left
				break
			case 'right':
				if (positions.xPosition < positions.xMax) moveXPosition = executeMovementTrigger.right
				break
			default:
				return
		}
		document.getElementById(`scroll-${movePosition}`)?.scrollIntoView()
		positions.setXPosition(moveXPosition)
		positions.setYPosition(movePosition)
		return movePosition
	}

	const joystickMoved = direction => {
		if (Date.now() - lastTimestamp < delayBetweenJoystickEvents) {
			return
		}
		joystickMovedTrigger(direction)
	}

	useEffect(() => {
		joystickEvent.on('button_press', buttonPressed)
		joystickEvent.on('axis_move', joystickMoved)

		return () => {
			joystickEvent.removeListener('axis_move', joystickMoved)
			joystickEvent.removeListener('button_press', buttonPressed)
		}
	})

	return <ControlsSelector type={controlType} clickCallback={button => joystickEvent.emit('button_press', button)} />
}

JoypadUtils.propTypes = {
	positions: PropTypes.shape({
		xPosition: PropTypes.number,
		yPosition: PropTypes.number,
		setXPosition: PropTypes.func,
		setYPosition: PropTypes.func,
		xMax: PropTypes.number,
		yMax: PropTypes.number,
	}),
	buttonPressed: PropTypes.func.isRequired,
	controlType: PropTypes.oneOf(ControlsTypesList),
}

JoypadUtils.defaultProps = {
	buttonPressed: () => void 0,
	positions: {
		xPosition: 0,
		yPosition: 0,
		setXPosition: () => void 0,
		setYPosition: () => void 0,
		xMax: 0,
		yMax: 0,
	},
}
