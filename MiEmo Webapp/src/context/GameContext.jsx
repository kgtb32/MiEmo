import React, { createContext, useState, useContext, useMemo } from 'react'
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

	const value = useMemo(
		() => ({
			games,
			currentPlatformId,
			getGames,
		}),
		[],
	)

	return <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
}

GameProvider.propTypes = {
	children: PropTypes.node,
}

const useGameContext = () => {
	return useContext(GameContext)
}

export default useGameContext
