import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import Alert from 'react-bootstrap/Alert'
import { InputSwitch } from 'primereact/inputswitch'

import SettingsHeader from '../../components/Settings/SettingsHeader'
import CurrentHologram from '../../components/Settings/holo/CurrentHologram'
import HologramSearch from '../../components/Settings/holo/HologramSearch'

import { AiFillInfoCircle } from 'react-icons/ai'

import apis from '../../api'

export default function Hologram() {
	const [hologramSettings, setHologramSettings] = useState({ selectedHologram: '', changeOnGameStart: true })
	const [availableHolograms, setAvailableHolograms] = useState([])
	const assignated = useRef(false)

	const fetchHolograms = () => apis.hologram.availableHolograms()

	useEffect(() => {
		const fetchSettings = () => apis.hologram.hologramSettings()

		Promise.all([fetchHolograms(), fetchSettings()])
			.then(res => {
				setAvailableHolograms(res[0])
				setHologramSettings(res[1])
				assignated.current = true
			})
			.catch()
	}, [])

	const addHologram = url => {
		apis.hologram.addHologram(url).then(res => {
			setHologramSettings({
				...hologramSettings,
				selectedHologram: res.holo_uuid,
			})
			fetchHolograms().then(setAvailableHolograms).catch()
		})
	}

	useEffect(() => {
		if (assignated.current) {
			apis.hologram
				.setHologramSetttings(hologramSettings.selectedHologram, hologramSettings.changeOnGameStart)
				.then()
				.catch()
		}
	}, [hologramSettings, assignated])

	return (
		<div className="p-4">
			<SettingsHeader headerTitle="Hologramme" backUrl="/settings" />
			<h4 className="my-4">Paramètres généraux</h4>
			<div className="d-flex">
				<InputSwitch
					checked={hologramSettings.changeOnGameStart}
					onChange={({ value }) => {
						setHologramSettings({
							...hologramSettings,
							changeOnGameStart: value.valueOf(),
						})
					}}
				/>
				<p className="mx-2 my-auto font-bold">Retransmettre le jeu en hologramme</p>
			</div>
			<h4 className="my-4">Choix de l&apos;hologramme</h4>
			{hologramSettings.changeOnGameStart && (
				<JoliAlert>
					<AiFillInfoCircle className="mx-2" size="1.8em" />
					<span>Lorsque un jeu sera lancé, le jeu sera retransmis en hologramme.</span>
				</JoliAlert>
			)}
			<CurrentHologram
				hologramSettings={hologramSettings}
				availableHolograms={availableHolograms}
				setHologramSettings={setHologramSettings}
			/>
			<HologramSearch addHologram={addHologram} />
		</div>
	)
}

const JoliAlert = styled(Alert)`
	color: white;
	border-radius: 4em;
	padding-bottom: 1em;
	padding-top: 1em;
	padding-left: 0.5em;
	padding-right: 0.5em;
`
