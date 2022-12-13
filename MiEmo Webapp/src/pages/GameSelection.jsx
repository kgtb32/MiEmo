import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { ProgressSpinner } from 'primereact/progressspinner'

import useGameContext from '../context/GameContext'

import { letters } from '../components/Game/GameLetterList'

import GameList from '../components/Game/GameList'
import GameDescription from '../components/Game/GameDescription'
import GameFilter from '../components/Game/GameFilter'
import PlatformHeader from '../components/Game/PlatformHeader'
import NoGameFound from '../components/Game/NoGameFound'

import JoypadUtils from '../utils/JoypadUtils'

import { loadLocalStorageKey } from '../utils/utils'
import { uniq } from 'lodash'

import settings from '../settings/settings'

export default function GameSelection() {
	const { promiseInProgress } = usePromiseTracker()

	const params = useParams()
	let navigate = useNavigate()

	const { getGames } = useGameContext()

	const [games, setGames] = useState({
		cached: [],
		filtered: [],
	})

	const [filterInfos, setFilterInfos] = useState({
		letters,
		genres: [],
		filterMode: 'letters',
	})

	const [positions, setPositions] = useState({
		x: 1,
		y: 0,
	})

	const [playMusic, setPlayMusic] = useState(loadLocalStorageKey(settings.game.musicKey, false) === 'true')

	const buttonPressed = button => {
		switch (button) {
			case settings.buttons.button_x: {
				if (games.filtered[positions.y]) {
					navigate(`/game/${params?.platformId}/${games.filtered[positions.y].game_id}`)
				}
				break
			}
			case settings.buttons.button_b:
				return alert('favori !')
			case settings.buttons.button_a: {
				setPlayMusic(!playMusic)
				localStorage.setItem(settings.game.musicKey, !playMusic)
				break
			}
			case settings.buttons.button_o:
				return navigate('/game')
			case settings.buttons.button_select: {
				setFilterInfos({
					...filterInfos,
					filterMode: filterInfos.filterMode === 'letters' ? 'genres' : 'letters',
				})
				break
			}
			default:
				return
		}
	}

	useEffect(() => {
		trackPromise(getGames(params?.platformId)).then(g => setGames({ filtered: g, cached: g }))
	}, [params?.platformId])

	useEffect(() => {
		if (filterInfos.filterMode === 'genres') {
			setFilterInfos({
				...filterInfos,
				genres: uniq(games.cached.flatMap(({ genres }) => genres.map(({ genre_name }) => genre_name))),
			})
			setGames({
				...games,
				filtered: games.cached,
			})
			setPositions({
				x: 0,
				y: 0,
			})
		}
	}, [filterInfos.filterMode])

	return (
		<div className="vh-100">
			{promiseInProgress && (
				<div className="w-100 h-100">
					<ProgressSpinner className="mx-auto d-block mt-50vh" />
				</div>
			)}
			{!promiseInProgress && (
				<div className="w-100 h-100 d-flex flex-column max-vh-100 p-4 user-select-none">
					<PlatformHeader platformUuid={params?.platformId} playMusic={playMusic} />
					<div className="d-flex flex-column flex-wrap overflow-hidden p-5">
						<div className="w-50 h-100 overflow-hidden d-flex flex-column">
							<div className="overflow-auto w-100 h-100 beauty-scroll px-1">
								<GameFilter
									setX={x => setPositions({ ...positions, x })}
									filterInfos={filterInfos}
									x={positions.x}
									games={games}
									setGames={setGames}
								/>
								{games.filtered.length == 0 && <NoGameFound />}
								<GameList
									games={games.filtered}
									currentItem={positions.y}
									setCurrentItem={y => setPositions({ ...positions, y })}
								/>
							</div>
						</div>
						<div className="overflow-auto h-100 w-50 beauty-scroll">
							{!!games.filtered[positions.y] && <GameDescription game={games.filtered[positions.y]} />}
						</div>
					</div>
				</div>
			)}
			<JoypadUtils
				positions={{
					yPosition: positions.y,
					yMax: games.filtered.length - 1,
					setYPosition: y => setPositions({ ...positions, y }),
					xMax: filterInfos[filterInfos.filterMode].length ?? 0 - 1,
					xPosition: positions.x,
					setXPosition: x => setPositions({ y: 0, x }),
				}}
				buttonPressed={buttonPressed}
				controlType="gameSelect"
			/>
		</div>
	)
}
