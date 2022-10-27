import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Col, Row, Spinner } from 'react-bootstrap'
import styled from 'styled-components'

import GameDescription from '../components/Game/GameDescription'
import SpecialControl from '../components/Game/SpecialControl'
import JoypadUtils from '../utils/JoypadUtils'

import apis from '../api'

let gameLaunched = false
export default function GameLauncher() {
	let navigate = useNavigate()
	const params = useParams()

	const [game, setGame] = useState()

	const getGame = () => {
		const fetch = async () => apis.game.get(params?.gameId)

		fetch()
			.then(game => setGame(game))
			.catch()
	}

	const play = gameId => {
		const fetch = async () => apis.game.play(gameId)

		fetch()
			.then(() => navigate(`/game/${params?.platformId}`))
			.catch()
	}

	useEffect(() => {
		if (params?.gameId) {
			getGame()
		}
	}, [params])

	useEffect(() => {
		if (game && !gameLaunched) {
			setTimeout(() => play(game?.game_id), 5000)
			gameLaunched = true
		}
	}, [game])

	useEffect(() => {
		gameLaunched = false
	}, [])

	return (
		<div className="w-100 p-4">
			{!!game && (
				<>
					<div className="mb-2 mx-auto d-block w-min-content">
						<img src={game.platform.console_logo} className="w-auto h-8" />
					</div>
					<Row className="d-flex text-break w-100 text-wrap flex-wrap flex-row my-4 h-100">
						<Col className="h-100">
							<div className="d-flex mx-auto w-fit-content my-4">
								<JoliSpinner animation="border" className="my-auto" />
								<p className="my-auto mx-2 fs-5">
									Lancement de <b>{game.name}</b> en cours ...
								</p>
							</div>
							<div className="h-50 d-flex flex-column w-100 overflow-auto">
								<h2 className="w-100 text-center">Contrôles actifs sur ce jeu</h2>
								<div>
									<img
										src={game.platform.controls}
										width="auto"
										height="auto"
										className="mx-auto d-block"
									/>
								</div>
							</div>
							<div className="d-flex w-100 my-4 h-25">
								<div className="d-flex">
									<SpecialControl text="START" />
									<SpecialControl text="SELECT" />
								</div>
								<p className="text-center text-wrap w-100 fs-5 my-auto">
									A tout moment appuyez simultanément sur <b>START</b> + <b>SELECT</b> pour quitter le
									jeu.
								</p>
							</div>
						</Col>
						<Col>
							<GameDescription game={game} />
						</Col>
					</Row>
				</>
			)}
			<JoypadUtils currentPosition={0} max={0} setCurrentPosition={() => void 0} controlType="gameLoad" />
		</div>
	)
}

const JoliSpinner = styled(Spinner)`
	height: 3em;
	width: 3em;
`
