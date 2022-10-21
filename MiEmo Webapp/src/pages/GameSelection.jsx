import React, { useCallback, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Row, Col } from 'react-bootstrap'

import ReactHowler from 'react-howler'

import GameList from '../components/Game/GameList'
import GameDescription from '../components/Game/GameDescription'

import JoypadUtils from '../utils/JoypadUtils'

import { EventEmitter } from 'events'

import api from '../api/'
import settings from '../settings/settings'
import { loadLocalStorageKey } from '../utils/utils'

const joystickEvent = new EventEmitter()

export default function GameSelection() {
	const params = useParams()
	let navigate = useNavigate()

	const [games, setGames] = useState([])
	const [selectedItem, setSelectedItem] = useState(0)
	const [playMusic, setPlayMusic] = useState(loadLocalStorageKey(settings.game.musicKey, false) === 'true')

	const buttonPressed = button => {
		switch (button) {
			case settings.buttons.button_x: {
				if (games[selectedItem]) {
					navigate(`/game/${params?.platformId}/${games[selectedItem].game_id}`)
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

	const fetchGames = useCallback(platformId => {
		const fetch = async () => api.game.list(platformId)
		fetch().then(setGames)
	}, [])

	useEffect(() => {
		fetchGames(params?.platformId)
	}, [params?.platformId, fetchGames])

	return (
		<>
			{!!games[selectedItem] && (
				<div className="w-100 d-flex flex-column p-4">
					<ReactHowler
						playing={playMusic}
						loop={true}
						src={games[selectedItem].platform.music}
						volume={settings.game.musicVolume / 100}
					/>
					<div className="mb-2 mx-auto d-block w-min-content">
						<img src={games[selectedItem].platform.console_logo} className="w-auto h-8" />
					</div>
					<Row className="w-100 my-4">
						<Col>
							<GameList games={games} currentItem={selectedItem} setCurrentItem={setSelectedItem} />
						</Col>
						<Col>
							<GameDescription game={games[selectedItem]} />
						</Col>
					</Row>
				</div>
			)}
			<JoypadUtils
				currentPosition={selectedItem}
				max={games.length - 1}
				setCurrentPosition={setSelectedItem}
				joystickEvent={joystickEvent}
				buttonPressed={buttonPressed}
				controlType="gameSelect"
			/>
		</>
	)
}
