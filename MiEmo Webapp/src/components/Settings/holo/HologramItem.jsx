import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Card } from 'react-bootstrap'

import { FaCheck, FaTrash } from 'react-icons/fa'

import '../../../static/css/CurrentHologram.css'

export default function HologramItem({ choosen, name, src, clickCallback, id, displayDeleteButton }) {
	return (
		<Card className={`p-2 my-1 ${choosen ? 'choosen' : ''}`}>
			<p className="text-center">{name}</p>
			<img src={src} height="180em" width="180em" className="obj-scale-down" onClick={() => clickCallback(id)} />
			{choosen && (
				<JoliDiv>
					<FaCheck />
				</JoliDiv>
			)}
			{displayDeleteButton && (
				<button className="b-none border-none">
					<FaTrash size="2em" onClick={() => clickCallback(id, 'delete')} />
				</button>
			)}
		</Card>
	)
}

HologramItem.propTypes = {
	choosen: PropTypes.bool,
	name: PropTypes.string,
	src: PropTypes.string,
	clickCallback: PropTypes.func,
	id: PropTypes.string,
	displayDeleteButton: PropTypes.bool,
}

HologramItem.defaultProps = {
	choosen: false,
	type: 'search',
	clickCallback: () => void 0,
}

const JoliDiv = styled.div`
	background: green;
	width: min-content;
	padding: 0.25em;
	position: absolute;
	right: 0px;
	top: 0px;
`
