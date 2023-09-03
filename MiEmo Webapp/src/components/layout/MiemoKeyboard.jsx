import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ReactKeyboard from 'react-simple-keyboard'
import useApplicationSettingsContext from '../../context/ApplicationSettingsContext'

import 'react-simple-keyboard/build/css/index.css'
import '../../static/css/keyboard.css'

export default function MiemoKeyboard({ value, setValue, keyboardVisible, goFunction, defaultKeyboard }) {
	const [layout, setLayout] = useState(defaultKeyboard)

	const { enableVirtualKeyboard } = useApplicationSettingsContext()

	useEffect(() => {
		setLayout(defaultKeyboard)
	}, [defaultKeyboard])

	const handleKeyPress = val => {
		switch (val) {
			case '{sw_numbers}':
				return setLayout('numbers')
			case '{sw_default}':
				return setLayout('default')
			case '{shift}':
				return layout == 'shift' ? setLayout('default') : setLayout('shift')
			case '{sw_spec}':
				return setLayout('sw_spec')
			case '{space}':
				return setValue(`${value} `)
			case '{go}':
				return goFunction()
			case '{bksp}':
				return setValue(`${value.slice(0, -1)}`)
			default:
				return setValue(`${value}${val}`)
		}
	}

	return (
		<>
			{keyboardVisible && enableVirtualKeyboard && (
				<JoliKeyboardContainer className="w-100 d-flex px-4">
					<ReactKeyboard
						className="w-100 min-width-100"
						theme={'hg-theme-default miemo-dark'}
						layoutName={layout}
						onKeyPress={handleKeyPress}
						stopMouseDownPropagation={true}
						stopMouseUpPropagation={true}
						preventMouseDownDefault={true}
						preventMouseUpDefault={true}
						display={{
							'{sw_numbers}': '?123',
							'{sw_spec}': '=\\<',
							'{bksp}': '⌫',
							'{space}': '⌴',
							'{shift}': '⬆',
							'{go}': '🔍',
							'{sw_default}': 'ABC',
						}}
						physicalKeyboardHighlight={true}
						layout={{
							default: [
								'a z e r t y u i o p',
								'q s d f g h j k l m',
								"{shift} w x c v b n ' {bksp}",
								'{sw_numbers} {sw_spec} {space} {go}',
							],
							shift: [
								'A Z E R T Y U I O P',
								'Q S D F G H J K L M',
								"{shift} W X C V B N ' {bksp}",
								'{sw_numbers} {sw_spec} {space} {go}',
							],
							numbers: [
								'1 2 3 4 5 6 7 8 9 0',
								'@ # € _ & - + ( ) / =',
								'` * " \' : ; ! ? {bksp}',
								'{sw_default} , {space} . {go}',
							],
							sw_spec: [
								'é è à ç ê â ï ë ù',
								'$ ^ ° { } [ ] %',
								'| & ~ ² < > {bksp}',
								'{sw_default} {sw_numbers} {space} {go}',
							],
						}}
					/>
				</JoliKeyboardContainer>
			)}
		</>
	)
}

const JoliKeyboardContainer = styled.div`
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 9999;
	background-color: #2f2f2f !important;
	border-radius: 1em 1em 0px 0px;
`

MiemoKeyboard.propTypes = {
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
	keyboardVisible: PropTypes.bool.isRequired,
	goFunction: PropTypes.func,
	defaultKeyboard: PropTypes.string,
}

MiemoKeyboard.defaultProps = {
	keyboardVisible: true,
	goFunction: () => void 0,
	defaultKeyboard: 'default',
}
