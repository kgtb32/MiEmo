import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'primereact/button'
import { ProgressSpinner } from 'primereact/progressspinner'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'

import HologramItem from './HologramItem'
import KeyboardedInput from '../../layout/KeyboardedInput'

import { FaSearch } from 'react-icons/fa'

import apis from '../../../api'

export default function HologramSearch({ addHologram }) {
	const [query, setQuery] = useState('')
	const [hologramSearch, setHologramSearch] = useState([])
	const { promiseInProgress } = usePromiseTracker()

	const fetchGifs = q => {
		const fetch = () => apis.gif.search(q)

		trackPromise(fetch())
			.then(setHologramSearch)
			.catch(() => void 0)
	}

	return (
		<div className="my-4">
			<h4>Ajouter un hologramme</h4>
			{promiseInProgress && (
				<div className="w-100 h-100">
					<ProgressSpinner className="mx-auto d-block mt-50vh" />
				</div>
			)}
			{!promiseInProgress && (
				<>
					<div className="d-flex my-1">
						<KeyboardedInput
							value={query}
							setValue={setQuery}
							props={{
								className: 'w-100',
								placeholder: 'Recherchez ici un hologramme',
							}}
						/>
						<Button onClick={() => fetchGifs(query)} className="mx-1">
							<FaSearch />
						</Button>
					</div>
					<div className="w-100 d-flex flex-wrap align-content-between justify-content-between align-content-between">
						{hologramSearch.map(h => (
							<HologramItem
								key={'holo_' + h.id}
								src={h.src}
								choosen={false}
								clickCallback={() => addHologram(h.src)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	)
}

HologramSearch.propTypes = {
	addHologram: PropTypes.func,
}
