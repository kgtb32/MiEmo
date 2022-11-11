import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { InputText } from 'primereact/inputtext'

import useKeyboardContext, { defaultKeyboardInstance } from '../../context/KeyboardContext'

export default function KeyboardedInput({ props, setValue, value, goFunction, defaultKeyboard }) {
	const { setKeyboardInstance } = useKeyboardContext()
	const [init, setInit] = useState(false)

	useEffect(() => {
		if (init)
			setKeyboardInstance({
				setValue: setValue,
				value: value,
				keyboardVisible: true,
				goFunction: goFunction,
				defaultKeyboard: defaultKeyboard,
			})
	}, [value, init])

	return (
		<div {...props}>
			<InputText
				onChange={e => setValue(e.target.value)}
				value={value}
				{...props}
				onBlur={e => {
					setInit(false)
					setKeyboardInstance(defaultKeyboardInstance)
					if (props?.onBlur) props?.onBlur(e)
				}}
				onFocus={e => {
					setInit(true)
					setKeyboardInstance({
						setValue: setValue,
						value: value,
						keyboardVisible: true,
						goFunction: goFunction,
						defaultKeyboard: defaultKeyboard,
					})
					if (props?.onFocus) props?.onFocus(e)
				}}
			/>
		</div>
	)
}

KeyboardedInput.propTypes = {
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	setValue: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	goFunction: PropTypes.func,
	defaultKeyboard: PropTypes.string,
	props: PropTypes.any,
}

KeyboardedInput.defaultProps = {
	goFunction: () => void 0,
}
