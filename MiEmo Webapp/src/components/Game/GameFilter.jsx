import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import GameLetterList from './GameLetterList'
import GameSearch from './GameSearch'
import GenreList from './GenreList'

export default function GameFilter({ filterInfos, x, setX, setGames, games }) {
	const [currentItem, setCurrentItem] = useState('FV')

	const filterGames = item => {
		if (filterInfos.filterMode === 'letters') {
			switch (item) {
				case 'SH':
					return games.cached
				case 'FV':
					return games.cached?.filter(({ favorite }) => favorite === true)
				default:
					return games.cached?.filter(({ name }) => name.toLowerCase().startsWith(currentItem.toLowerCase()))
			}
		} else {
			return games.cached?.filter(({ genres }) =>
				genres.map(({ genre_name }) => genre_name).includes(currentItem),
			)
		}
	}

	useEffect(() => {
		setCurrentItem(filterInfos[filterInfos.filterMode][x] ?? '')
	}, [x])

	useEffect(() => {
		setCurrentItem(filterInfos.filterMode === 'letters' ? filterInfos.letters[1] : filterInfos.genres[0] ?? '')
	}, [filterInfos.filterMode])

	useEffect(() => {
		setGames({
			...games,
			filtered: filterGames(currentItem),
		})
	}, [currentItem])

	return (
		<div>
			{filterInfos.filterMode === 'letters' && (
				<>
					<GameLetterList
						currentLetter={currentItem}
						setCurrentLetter={lt => {
							setCurrentItem(lt)
							setX(filterInfos[filterInfos.filterMode].indexOf(lt))
						}}
					/>
					{currentItem === 'SH' && (
						<GameSearch
							setGames={g =>
								setGames({
									...games,
									filtered: g,
								})
							}
							games={games.cached}
						/>
					)}
				</>
			)}
			{filterInfos.filterMode === 'genres' && (
				<GenreList
					genres={filterInfos?.genres}
					currentGenre={filterInfos?.genres?.indexOf(currentItem) ?? ''}
					setCurrentGenre={i => setCurrentItem(filterInfos.genres[i] ?? '')}
				/>
			)}
		</div>
	)
}

GameFilter.propTypes = {
	filterInfos: PropTypes.shape({
		letters: PropTypes.array.isRequired,
		genres: PropTypes.array.isRequired,
		filterMode: PropTypes.oneOf(['letters', 'genres']).isRequired,
	}).isRequired,
	games: PropTypes.object.isRequired,
	setGames: PropTypes.func.isRequired,
	x: PropTypes.number.isRequired,
	setX: PropTypes.func.isRequired,
}
