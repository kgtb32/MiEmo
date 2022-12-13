import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { ProgressSpinner } from 'primereact/progressspinner'

import GameList from '../components/Game/GameList'
import GameDescription from '../components/Game/GameDescription'
import GameLetterList, { letters } from '../components/Game/GameLetterList'
import PlatformHeader from '../components/Game/PlatformHeader'
import NoGameFound from '../components/Game/NoGameFound'
import GameSearch from '../components/Game/GameSearch'

import JoypadUtils from '../utils/JoypadUtils'

import { loadLocalStorageKey } from '../utils/utils'

import settings from '../settings/settings'
import useGameContext from '../context/GameContext'

export default function GameSelection() {
	const params = useParams()
	let navigate = useNavigate()

	const { promiseInProgress } = usePromiseTracker()
	const { getGames } = useGameContext()

	const [games, setGames] = useState([])
	const [filteredGames, setFilteredGames] = useState({
		games: [],
		letter: 'A',
		letterPosition: 2,
	})
	const [selectedItem, setSelectedItem] = useState(-1)
	const [playMusic, setPlayMusic] = useState(loadLocalStorageKey(settings.game.musicKey, false) === 'true')
	const [searchMode, setSearchMode] = useState(false)

	useEffect(() => {
		if (filteredGames.letter == 'FV') {
			setFilteredGames({
				...filteredGames,
				games: games.filter(({ favorite }) => !!favorite),
			})
			setSearchMode(false)
		} else if (filteredGames.letter == 'SH') {
			setFilteredGames({
				...filteredGames,
				games: [],
			})
			setSearchMode(true)
		} else {
			setSearchMode(false)
			setFilteredGames({
				...filteredGames,
				games: games.filter(({ name }) => name.toLowerCase().startsWith(filteredGames.letter.toLowerCase())),
			})
		}
	}, [filteredGames.letter, games])

	useEffect(() => {
		if (filteredGames.games.length > 0) setSelectedItem(0)
	}, [filteredGames.games])

	const buttonPressed = button => {
		switch (button) {
			case settings.buttons.button_x: {
				if (filteredGames.games[selectedItem]) {
					navigate(`/game/${params?.platformId}/${filteredGames.games[selectedItem].game_id}`)
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
			default:
				return
		}
	}

	useEffect(() => {
		trackPromise(getGames(params?.platformId)).then(setGames)
	}, [params?.platformId])

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
							<div className="w-100">
								<GameLetterList
									currentLetter={filteredGames.letter}
									setCurrentLetter={letter =>
										setFilteredGames({
											...filteredGames,
											letter,
										})
									}
								/>
							</div>
							{searchMode && (
								<GameSearch
									setGames={games => {
										setFilteredGames({
											...filteredGames,
											games,
										})
									}}
									games={games}
								/>
							)}
							<div className="overflow-auto w-100 h-100 beauty-scroll px-1">
								{filteredGames.games.length == 0 && <NoGameFound />}
								{!!filteredGames.games[selectedItem] && (
									<GameList
										games={filteredGames.games}
										currentItem={selectedItem}
										setCurrentItem={setSelectedItem}
									/>
								)}
							</div>
						</div>
						<div className="overflow-auto h-100 w-50 beauty-scroll">
							{!!filteredGames.games[selectedItem] && (
								<GameDescription game={filteredGames.games[selectedItem]} />
							)}
						</div>
					</div>
				</div>
			)}

			<JoypadUtils
				positions={{
					yPosition: selectedItem,
					yMax: filteredGames.games.length - 1,
					setYPosition: setSelectedItem,
					xPosition: filteredGames.letterPosition,
					xMax: letters.length - 1,
					setXPosition: position => {
						setFilteredGames({
							...filteredGames,
							letterPosition: position,
							letter: letters[position],
						})
					},
				}}
				buttonPressed={buttonPressed}
				controlType="gameSelect"
			/>
		</div>
	)
}
