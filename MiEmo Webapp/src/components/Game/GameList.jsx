import React from 'react'
import PropTypes from 'prop-types'

import { ListGroup } from 'react-bootstrap'

import GameItem from './GameItem'

import { gamePropTypes } from '../../proptypes/gamePropTypes'

export default function GameList({ games, currentItem, setCurrentItem }) {
	return (
		<ListGroup variant="flush" className="w-100 game-list">
			{games.map((game, index) => {
				return (
					<GameItem
						key={`game_list_${index}`}
						onClick={() => setCurrentItem(index)}
						game={game}
						index={index}
						selected={currentItem == index}
					/>
				)
			})}
		</ListGroup>
	)
}

GameList.propTypes = {
	games: PropTypes.arrayOf(PropTypes.shape(gamePropTypes)),
	currentItem: PropTypes.number,
	setCurrentItem: PropTypes.func,
}

GameList.defaultProps = {
	games: [],
	currentItem: 0,
	setCurrentItem: () => void 0,
}
