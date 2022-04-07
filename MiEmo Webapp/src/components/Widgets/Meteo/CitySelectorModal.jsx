import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { ListBox } from 'primereact/listbox'

import { Modal } from 'react-bootstrap'

import { FaSearch } from 'react-icons/fa'

import api from '../../../api'

export default function CitySelectorModal({ setCity, setModalVisible }) {
	const [cityName, setCityName] = useState('')
	const [results, setResult] = useState([])
	const [selectedCity, setSelectedCity] = useState({})

	const executeCitySearch = () => {
		const fecthAPI = async () => {
			return api.city.find(cityName)
		}

		fecthAPI()
			.then(res => {
				setResult(res.results ?? [])
			})
			.catch(() => setResult([]))
	}

	const generateTemplate = option => {
		return (
			<div>
				<span className={`fi fi-${option.country_code.toLowerCase()}`} />
				<span className="mx-1">{option.name}</span>
				<span className="ml-1">({option.admin1})</span>
			</div>
		)
	}

	return (
		<Modal show={true} onHide={() => setModalVisible(false)} className="no-drag" size="lg">
			<Modal.Header closeButton>
				<Modal.Title>Rechercher une ville</Modal.Title>
			</Modal.Header>
			{selectedCity.name && (
				<div className="px-2">
					<div>
						<small className="text-muted">Ville choisie :</small>
					</div>
					{generateTemplate(selectedCity)}
				</div>
			)}
			<Modal.Body>
				<div className="d-flex">
					<InputText
						value={cityName}
						onChange={e => setCityName(e.target.value)}
						onKeyUp={e => setCityName(e.target.value)}
						className="p-inputtext-sm w-100"
					/>
					<Button className="p-button-sm" onClick={() => executeCitySearch()}>
						<FaSearch />
					</Button>
				</div>
				<div>
					{results.length == 0 && <p>Aucun résultat</p>}
					{results.length > 0 && (
						<ListBox
							className="list-unstyled overflow-auto"
							style={{ height: '350px' }}
							value={selectedCity}
							options={results}
							onChange={e => setSelectedCity(e.value)}
							itemTemplate={generateTemplate}
						/>
					)}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className="d-flex justify-content-between w-100">
					<Button className="p-button-sm" onClick={() => setModalVisible(false)}>
						Fermer
					</Button>
					{selectedCity.name && (
						<Button
							className="p-button-sm p-button-success"
							onClick={() => {
								setCity(selectedCity)
								setModalVisible(false)
							}}
						>
							Valider
						</Button>
					)}
				</div>
			</Modal.Footer>
		</Modal>
	)
}

CitySelectorModal.propTypes = {
	setCity: PropTypes.func,
	setModalVisible: PropTypes.func,
}
