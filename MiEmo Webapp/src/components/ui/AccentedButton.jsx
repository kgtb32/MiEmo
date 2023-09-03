import { Button } from 'primereact/button'
import React from 'react'
import styled from 'styled-components'

import useApplicationSettingsContext from '../../context/ApplicationSettingsContext'
import { getColorFromSettings } from '../../utils/utils'

export default function AccentedButton(props) {
	const { selectedColor } = useApplicationSettingsContext()
	const color = getColorFromSettings(selectedColor)

	return <JoliButton {...props} bg={color} />
}

const JoliButton = styled(Button)`
	background: ${props => props.bg} !important;
	border-color: ${props => props.bg} !important;

	&:focus {
		box-shadow: 0 0 0 2px #1c2127, 0 0 0 4px ${props => props.bg}, 0 1px 2px 0 rgba(0, 0, 0, 0);
	}
`
