import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ControlsSelector, { ControlsTypesList } from '../components/Game/ControlsSelector'

import { joystickEvent } from './joypadInstanceManager'

let lastTimestamp = 0
const delayBetweenJoystickEvents = 200

export default function JoypadUtils({ currentPosition, max, setCurrentPosition, buttonPressed, controlType }) {
	const joystickMoved = direction => {
		if (Date.now() - lastTimestamp < delayBetweenJoystickEvents) {
			return
		}
		if (direction == 'bottom') {
			if (currentPosition < max) {
				lastTimestamp = Date.now()
				setCurrentPosition(currentPosition + 1)
			}
		} else if (direction == 'top') {
			if (currentPosition > 0) {
				lastTimestamp = Date.now()
				setCurrentPosition(currentPosition - 1)
			}
		}
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
	currentPosition: PropTypes.number.isRequired,
	setCurrentPosition: PropTypes.func.isRequired,
	buttonPressed: PropTypes.func.isRequired,
	max: PropTypes.number.isRequired,
	controlType: PropTypes.oneOf(ControlsTypesList),
}

JoypadUtils.defaultProps = {
	currentPosition: 0,
	max: 0,
	setCurrentPosition: () => void 0,
	buttonPressed: () => void 0,
}
