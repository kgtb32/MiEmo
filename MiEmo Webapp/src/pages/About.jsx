import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import SettingsHeader from '../components/Settings/SettingsHeader'

import { Accordion } from 'react-bootstrap'

import MiemoLogo from '/img/logo_miror.png'

export default function About() {
	const [LicencesHolo, setLicencesHolo] = useState({})
	const [LicencesFront, setLicenceFront] = useState({})
	const [LicenceEmotion, setLicenceEmotion] = useState('')
	const [LicenceGame, setLicenceGame] = useState('')
	const [LicenceRecord, setLicenceRecord] = useState('')
	const [LicenceAudio, setLicenceAudio] = useState('')
	const [LicenceWifi, setLicenceWifi] = useState('')
	const [InstalledSoftware, setInstalledSoftware] = useState('')

	const fetchJson = url => fetch(url).then(res => res.json())
	const fetchTxt = url => fetch(url).then(res => res.text())

	const fetchLicences = () => {
		return Promise.all([
			fetchJson('/licences_holo.json'),
			fetchJson('/licences_front.json'),
			fetchTxt('/licences_emotion.txt'),
			fetchTxt('/licences_games.txt'),
			fetchTxt('/licences_record.txt'),
			fetchTxt('/licences_audio.txt'),
			fetchTxt('/licences_wifi.txt'),
			fetchTxt('/licences_install.txt'),
		]).then(res => {
			setLicencesHolo(res[0])
			setLicenceFront(res[1])
			setLicenceEmotion(res[2])
			setLicenceGame(res[3])
			setLicenceRecord(res[4])
			setLicenceAudio(res[5])
			setLicenceWifi(res[6])
			setInstalledSoftware(res[7])
		})
	}

	useEffect(() => {
		fetchLicences()
	}, [])

	return (
		<div className="p-4">
			<SettingsHeader backUrl="/settings" headerTitle="A propos de" />
			<div className="w-100">
				<img src={MiemoLogo} height="120em" className="d-flex w-min-content mx-auto" />
				<p className="text-center">Version 2.0.1 - Démo Mode</p>
				<p className="text-center">Ce programme est fourni à but non commercial sans aucune garantie.</p>
			</div>
			<h3 className="text-center my-4">Auteurs</h3>
			<div className="text-center">
				<p>Rokenson JAJOUTE</p>
				<p>Timothey CAUCHOIS</p>
				<p>Kévin GOMES TEIXEIRA</p>
			</div>
			<h3 className="text-center my-4">Licences Open Source</h3>
			<Accordion defaultActiveKey="-1">
				<Accordion.Item eventKey="0">
					<Accordion.Header>Retrobox WebApp</Accordion.Header>
					<Accordion.Body>
						{Object.keys(LicencesFront).map(l => (
							<div key={nanoid(128)} className="my-1 mx-auto text-center">
								<p>{l}</p>
								<p>{LicencesFront[l].licenses}</p>
							</div>
						))}
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Retrobox HologramClient</Accordion.Header>
					<Accordion.Body>
						{Object.keys(LicencesHolo).map(l => (
							<div key={nanoid(128)} className="my-1 mx-auto text-center">
								<p>{l}</p>
								<p>{LicencesHolo[l].licenses}</p>
							</div>
						))}
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>RetroBox Emotion</Accordion.Header>
					<Accordion.Body style={{ whiteSpace: 'break-spaces' }}>
						<p className="mx-auto w-fit-content">{LicenceEmotion}</p>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="3">
					<Accordion.Header>RetroBox Game</Accordion.Header>
					<Accordion.Body style={{ whiteSpace: 'break-spaces' }}>
						<p className="mx-auto w-fit-content">{LicenceGame}</p>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="4">
					<Accordion.Header>RetroBox Record</Accordion.Header>
					<Accordion.Body style={{ whiteSpace: 'break-spaces' }}>
						<p className="mx-auto w-fit-content">{LicenceRecord}</p>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="5">
					<Accordion.Header>RetroBox Audio Manager</Accordion.Header>
					<Accordion.Body style={{ whiteSpace: 'break-spaces' }}>
						<p className="mx-auto w-fit-content">{LicenceAudio}</p>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="6">
					<Accordion.Header>RetroBox Wifi</Accordion.Header>
					<Accordion.Body style={{ whiteSpace: 'break-spaces' }}>
						<p className="mx-auto w-fit-content">{LicenceWifi}</p>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="7">
					<Accordion.Header>Paquets et utilitaires installés</Accordion.Header>
					<Accordion.Body style={{ whiteSpace: 'break-spaces' }}>
						<p className="mx-auto w-fit-content">{InstalledSoftware}</p>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	)
}
