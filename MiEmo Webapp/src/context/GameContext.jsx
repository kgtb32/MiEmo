import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

import api from '../api/'

export const GameContext = createContext()

export const GameProvider = props => {
	const [games, setGame] = useState([])
	const [currentPlatformId, setCurrentPlatformId] = useState(null)

	const fetchGames = platformId => {
		return new Promise((resolve, reject) => {
			const fetch = async () => api.game.list(platformId)

			fetch()
				.then(games => {
					setCurrentPlatformId(platformId)
					setGame(games)
					resolve(games)
				})
				.catch(reject)
		})
	}

	const getGames = platformId => {
		return new Promise((resolve, reject) => {
			if (currentPlatformId == platformId) {
				return resolve(games)
			}
			fetchGames(platformId).then(resolve).catch(reject)
		})
	}

	return (
		<GameContext.Provider
			value={{
				games,
				currentPlatformId,
				getGames,
			}}
		>
			{props.children}
		</GameContext.Provider>
	)
}

GameProvider.propTypes = {
	children: PropTypes.node,
}

const useGameContext = () => {
	return useContext(GameContext)
}

export default useGameContext
