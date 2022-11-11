import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'react-bootstrap'
import { Button } from 'primereact/button'

import KeyboardedInput from '../layout/KeyboardedInput'

import { FaLock, FaUnlock } from 'react-icons/fa'

import api from '../../api/'

function WifiPasswordSelector({ wifiInfos, setModalVisible, modalVisible }) {
	const needPassword = wifiInfos.security != '--'
	const [password, setPassword] = useState('')
	const [errored, setErrored] = useState(false)

	useEffect(() => {
		setPassword('')
	}, [wifiInfos])

	const connect = () => {
		const fetch = async () => api.wifi.connect(wifiInfos.ssid, password)

		fetch()
			.then(() => {
				setErrored(false)
				setModalVisible(false)
			})
			.catch(() => setErrored(true))
	}

	return (
		<Modal show={modalVisible} onHide={() => setModalVisible(false)} className="no-drag" size="lg">
			<Modal.Header closeButton>
				<Modal.Title>Connexion à {`${wifiInfos.ssid}`}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{needPassword ? (
					<div>
						<div className="d-flex">
							<FaLock className="mx-2" size="1.5em" />
							<p>Sécurité : {`${wifiInfos.security}`}</p>
						</div>
						{errored && <p>mot de passe invalide !</p>}
						<span className="text-muted">Mot de passe</span>
						<KeyboardedInput
							setValue={setPassword}
							value={password}
							goFunction={connect}
							props={{
								className: 'w-100',
								type: 'password',
							}}
						/>
					</div>
				) : (
					<div>
						<div className="d-flex justify-content-center">
							<FaUnlock color="orange" size="2em" className="mx-2" />
							<p>Ce réseau ne requiert pas d&apos;authentification spécifique.</p>
						</div>
					</div>
				)}
			</Modal.Body>
			<div className="d-flex p-4 d-flex justify-content-between">
				<Button className="p-button-danger">Annuler</Button>
				<Button disabled={needPassword && password.length == 0} onClick={connect}>
					Connexion
				</Button>
			</div>
		</Modal>
	)
}

WifiPasswordSelector.propTypes = {
	wifiInfos: PropTypes.shape({
		ssid: PropTypes.string,
		security: PropTypes.string,
		inUse: PropTypes.string,
		signal: PropTypes.string,
	}),
	setModalVisible: PropTypes.func.isRequired,
	modalVisible: PropTypes.bool.isRequired,
}

WifiPasswordSelector.defaultProps = {
	wifiInfos: {
		ssid: '',
		security: '--',
		inUse: '*',
		signal: '0',
	},
}

export default WifiPasswordSelector
