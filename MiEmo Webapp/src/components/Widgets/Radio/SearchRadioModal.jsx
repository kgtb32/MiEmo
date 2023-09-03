import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { ListGroup, Modal } from 'react-bootstrap'

import RadioListItem from './RadioListItem'
import KeyboardedInput from '../../layout/KeyboardedInput'

import api from '../../../api'

import { FaSearch } from 'react-icons/fa'
import AccentedButton from '../../ui/AccentedButton'
import AccentedListGroupItem from '../../ui/AcccentedListGroupItem'

function SearchRadioModal({ setCurrentRadio, isModalVisible, setModalVisible }) {
	const [query, setQuery] = useState('')
	const [result, setResult] = useState([])

	const executeSearch = useCallback(() => {
		const fetchAPI = async () => {
			return api.radio.search(query)
		}

		fetchAPI().then(res => setResult(res))
	})

	return (
		<Modal show={isModalVisible} onHide={() => setModalVisible(false)} className="no-drag" size="lg">
			<Modal.Header className="bg-dark text-white" closeButton closeVariant="white">
				Rechercher une radio
			</Modal.Header>
			<Modal.Body className="bg-dark text-white h-100">
				<div>
					<div className="w-100 p-3 pt-0">
						<small className="text-muted">Entrez le nom de la radio à rechercher</small>
						<div className="d-flex">
							<KeyboardedInput
								setValue={setQuery}
								value={query}
								props={{ className: 'w-100' }}
								goFunction={executeSearch}
							/>
							<AccentedButton
								className="mx-1"
								disabled={query.length < 3}
								onClick={() => executeSearch()}
							>
								<FaSearch />
							</AccentedButton>
						</div>
					</div>
				</div>
				<div
					className="overflow-auto"
					style={{
						maxHeight: '400px',
					}}
				>
					<ListGroup>
						{result.map((e, i) => {
							return (
								<AccentedListGroupItem
									className="bg-dark text-white border-bottom-1 border-top-0 border-left-0 border-right-0 border-light my-1 rounded"
									key={'radio_found' + i}
									onClick={() => {
										setCurrentRadio(e)
										setModalVisible(false)
									}}
								>
									<RadioListItem
										radioInfos={{
											name: e.name,
											stationUuid: e.stationuuid,
											url: e.url,
											favicon: e.favicon,
											country: e.country,
											countryCode: e.countrycode,
										}}
									/>
								</AccentedListGroupItem>
							)
						})}
					</ListGroup>
				</div>
			</Modal.Body>
		</Modal>
	)
}

SearchRadioModal.propTypes = {
	setCurrentRadio: PropTypes.func,
	isModalVisible: PropTypes.bool,
	setModalVisible: PropTypes.func,
}

export default SearchRadioModal
