import React from 'react'
import PropTypes from 'prop-types'

import { nanoid } from 'nanoid'

import { FaSearch, FaStar } from 'react-icons/fa'

export const letters = [
	'SH',
	'FV',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
]

export default function GameLetterList({ currentLetter, setCurrentLetter }) {
	const id = nanoid(12)

	const getLogoOrLetter = letter => {
		switch (letter) {
			case 'FV':
				return <FaStar />
			case 'SH':
				return <FaSearch />
			default:
				return <>{letter}</>
		}
	}

	return (
		<div className="d-flex flex-row w-100 flex-wrap justify-content-center">
			{letters.map(letter => {
				return (
					<div
						id={`${id}-select-letter-${letter}`}
						className={`w-min-content p-2 mx-1 rounded text-center my-1 user-select-none ${
							letter == currentLetter ? 'beauty-background' : ''
						}`}
						style={{
							height: '2.7em',
							width: '2em',
						}}
						key={`letter_${letter}`}
						onClick={() => setCurrentLetter(letter)}
					>
						{getLogoOrLetter(letter)}
					</div>
				)
			})}
		</div>
	)
}

GameLetterList.propTypes = {
	currentLetter: PropTypes.string.isRequired,
	setCurrentLetter: PropTypes.func.isRequired,
}
