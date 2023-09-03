import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FaCheck } from 'react-icons/fa'

export default function ColorItem({ color, colorId, selected, colorSelected }) {
	return (
		<JoliColorDiv bg={color} onClick={() => colorSelected(colorId)}>
			{selected && <FaCheck className="d-block m-auto h-100" color="black" size="2.5em" />}
		</JoliColorDiv>
	)
}

const JoliColorDiv = styled.div`
	width: 6em;
	height: 6em;
	background: ${props => props.bg};
	border-radius: 50%;
`

ColorItem.propTypes = {
	color: PropTypes.string.isRequired,
	colorId: PropTypes.string.isRequired,
	colorSelected: PropTypes.func.isRequired,
	selected: PropTypes.bool,
}
