import 'joypad.js'
import { EventEmitter } from 'events'

export const joystickEvent = new EventEmitter()

let lastTimestamp = new Date()
const delayBetweenJoystickEvents = 200

const joystickMoved = direction => {
	if (Date.now() - lastTimestamp < delayBetweenJoystickEvents) {
		return
	}
	lastTimestamp = Date.now()
	joystickEvent.emit('axis_move', direction)
}

const buttonPressed = button => {
	if (Date.now() - lastTimestamp < delayBetweenJoystickEvents) {
		return
	}
	lastTimestamp = Date.now()
	joystickEvent.emit('button_press', button)
}

globalThis.joypad.on('axis_move', e => joystickMoved(e.detail.directionOfMovement))
globalThis.joypad.on('button_press', e => buttonPressed(e.detail.buttonName))
