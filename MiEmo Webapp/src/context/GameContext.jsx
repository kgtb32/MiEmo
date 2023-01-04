import React, { createContext, useState, useContext, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'

import api from '../api/'

export const GameContext = createContext()

export const GameProvider = props => {
	const [games, setGame] = useState([])
	const [favorites, setFavorites] = useState({})
	const [favoritesGames, setFavoritesGames] = useState([])
	const [currentPlatformId, setCurrentPlatformId] = useState(null)

	const calculateFavorites = (games, favorites) => {
		const favoritesArray = Object.keys(favorites)
		return games.filter(({ game_id }) => favoritesArray.includes(game_id))
	}

	const fetchGames = platformId => {
		return new Promise((resolve, reject) => {
			const fetch = async () => api.game.list(platformId)
			fetch()
				.then(games => {
					const fv = getFavorites(platformId)
					setFavorites(fv)
					setFavoritesGames(calculateFavorites(games, fv))
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

	const markAsFavorite = game_uuid => {
		let fv
		if (favorites[game_uuid]) {
			fv = Object.keys(favorites)
				.filter(k => k != game_uuid)
				.reduce((k, v) => ({
					...k,
					[v]: true,
				}))
		} else {
			fv = {
				...favorites,
				[game_uuid]: !(favorites[game_uuid] ?? false),
			}
		}
		setFavorites(fv)
		setFavoritesGames(calculateFavorites(games, fv))
	}

	const getFavorites = platformId => {
		return JSON.parse(localStorage.getItem(`com.miemo.game.favorite.${platformId}`)) ?? {}
	}

	useEffect(() => {
		if (favorites) {
			localStorage.setItem(`com.miemo.game.favorite.${currentPlatformId}`, JSON.stringify(favorites))
		}
	}, [favorites])

	const value = useMemo(
		() => ({
			games,
			currentPlatformId,
			getGames,
			favorites: favoritesGames,
			markAsFavorite,
		}),
		[games, favorites],
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
