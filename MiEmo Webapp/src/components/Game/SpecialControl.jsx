import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function SpecialControl({ text }) {
	return (
		<div className="my-auto">
			<JoliPill className="p-2 mx-1">{text}</JoliPill>
		</div>
	)
}

const JoliPill = styled.div`
	background: #f39c12;
	color: black;
	border-radius: 4em;
	min-width: max-content;
`

SpecialControl.propTypes = {
	text: PropTypes.string.isRequired,
}

SpecialControl.defaultProps = {
	text: '-------',
}
