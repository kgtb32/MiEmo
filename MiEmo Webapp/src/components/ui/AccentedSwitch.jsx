import React from 'react'
import styled from 'styled-components'

import { InputSwitch } from 'primereact/inputswitch'

import useApplicationSettingsContext from '../../context/ApplicationSettingsContext'
import { getColorFromSettings } from '../../utils/utils'

export default function AccentedSwitch(props) {
	const { selectedColor } = useApplicationSettingsContext()
	const color = getColorFromSettings(selectedColor)

	return <JoliSwitch color={color} {...props} />
}

const JoliSwitch = styled(InputSwitch)`
	& .p-inputswitch-slider {
		background: ${props => (props.checked ? props.color : 'transparent')} !important;
		border: 1px solid ${props => props.color};
	}
`
