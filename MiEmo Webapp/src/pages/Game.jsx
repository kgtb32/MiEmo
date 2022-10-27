import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Col, Row } from 'react-bootstrap'

import PlatformList from '../components/Game/PlatformList'
import PlatformDescription from '../components/Game/PlatformDescription'
import JoypadUtils from '../utils/JoypadUtils'

import api from '../api/'

import settings from '../settings/settings'

export default function Game() {
	const [platforms, setPlatforms] = useState([])
	const [selectedPlatform, setSelectedPlatform] = useState(0)

	let navigate = useNavigate()

	const fetchPlatforms = useCallback(() => {
		const fetch = async () => api.game.platform()

		fetch()
			.then(setPlatforms)
			.catch(err => console.error(err))
	}, [api.game.platform])

	const buttonPressed = buttonName => {
		console.log('button pressed')
		if (buttonName == settings.buttons.button_x) {
			navigate(`/game/${platforms[selectedPlatform].platform_id}`)
		} else if (buttonName == settings.buttons.button_o) {
			navigate('/')
		}
	}

	useEffect(() => {
		fetchPlatforms()
	}, [fetchPlatforms])

	return (
		<Row className="w-100">
			<Col xl="2" lg="3" md="4" sm="4" xs="12" className="pl-1 pr-0">
				<PlatformList
					platforms={platforms}
					selectedPlatform={selectedPlatform}
					setSelectedPlatform={setSelectedPlatform}
				/>
			</Col>
			<Col className="p-0">
				{!!platforms[selectedPlatform] && <PlatformDescription platform={platforms[selectedPlatform]} />}
			</Col>
			<JoypadUtils
				currentPosition={selectedPlatform}
				max={platforms.length - 1}
				setCurrentPosition={setSelectedPlatform}
				buttonPressed={buttonPressed}
				controlType="platformSelect"
			/>
		</Row>
	)
}
