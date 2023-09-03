import React from 'react'
import styled from 'styled-components'

import { ProgressBar } from 'primereact/progressbar'

import useApplicationSettingsContext from '../../context/ApplicationSettingsContext'
import { getColorFromSettings } from '../../utils/utils'

export default function AccentedProgressBar(props) {
	const { selectedColor } = useApplicationSettingsContext()
	const color = getColorFromSettings(selectedColor)

	return <JoliProgressBar color={color} {...props} />
}

const JoliProgressBar = styled(ProgressBar)`
	& .p-progressbar-value {
		background: ${props => props.color} !important;
	}
`
