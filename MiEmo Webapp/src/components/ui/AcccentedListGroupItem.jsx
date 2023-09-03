import React from 'react'
import styled from 'styled-components'

import { ListGroup } from 'react-bootstrap'

import useApplicationSettingsContext from '../../context/ApplicationSettingsContext'
import { getColorFromSettings } from '../../utils/utils'

export default function AccentedListGroupItem(props) {
	const { selectedColor } = useApplicationSettingsContext()
	const color = getColorFromSettings(selectedColor)

	return <JoliListGroupItem color={color} {...props} />
}

const JoliListGroupItem = styled(ListGroup.Item)`
	background: ${props => (props?.active ?? true ? props.color : 'transparent')} !important;
`
