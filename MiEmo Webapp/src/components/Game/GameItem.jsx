import React from 'react'
import PropTypes from 'prop-types'

import { ListGroup } from 'react-bootstrap'

import { gamePropTypes } from '../../proptypes/gamePropTypes'

export default function GameItem({ game, onClick, selected }) {
	return (
		<ListGroup.Item action onClick={onClick} active={selected}>
			{game.name}
		</ListGroup.Item>
	)
}

GameItem.propTypes = {
	game: PropTypes.shape(gamePropTypes).isRequired,
	onClick: PropTypes.func.isRequired,
	selected: PropTypes.bool.isRequired,
}

GameItem.defaultProps = {
	onClick: () => void 0,
	selected: false,
}
