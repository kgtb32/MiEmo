import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'primereact/button'

import KeyboardedInput from '../layout/KeyboardedInput'

import { snakeCase, deburr } from 'lodash'

import { FaSearch } from 'react-icons/fa'

export default function GameSearch({ setGames, games }) {
	const [searchString, setSearchString] = useState('')

	const executeStringSearch = text => {
		return deburr(snakeCase(text)).includes(deburr(snakeCase(searchString)))
	}

	useEffect(() => {
		setGames(games.filter(({ name }) => executeStringSearch(name)))
	}, [searchString])

	return (
		<div className="w-100 d-flex my-1">
			<KeyboardedInput setValue={setSearchString} value={searchString} props={{ className: 'w-100 mx-1 px-1' }} />
			<Button>
				<FaSearch />
			</Button>
		</div>
	)
}

GameSearch.propTypes = {
	setGames: PropTypes.func.isRequired,
	games: PropTypes.array.isRequired,
}
