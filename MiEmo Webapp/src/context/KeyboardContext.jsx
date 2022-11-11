import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

import MiemoKeyboard from '../components/layout/MiemoKeyboard'

export const KeyboardContext = createContext()

export const defaultKeyboardInstance = {
	setValue: () => void 0,
	value: '',
	keyboardVisible: false,
	goFunction: () => void 0,
	defaultKeyboard: 'default',
}

export const KeyboardProvider = props => {
	const [keyboardInstance, setKeyboardInstance] = useState(defaultKeyboardInstance)

	return (
		<KeyboardContext.Provider
			value={{
				setKeyboardInstance,
			}}
		>
			{props.children}
			<>
				<MiemoKeyboard
					{...keyboardInstance}
					goFunction={() => {
						keyboardInstance?.goFunction()
						setKeyboardInstance(defaultKeyboardInstance)
					}}
				/>
			</>
		</KeyboardContext.Provider>
	)
}

KeyboardProvider.propTypes = {
	children: PropTypes.any,
}

const useKeyboardContext = () => {
	return useContext(KeyboardContext)
}

export default useKeyboardContext
