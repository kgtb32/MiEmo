import React from 'react'
import PropTypes from 'prop-types'

import { nanoid } from 'nanoid'

export const letters = [
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

	return (
		<div className="d-flex flex-row w-100 flex-wrap justify-content-center">
			{letters.map(letter => {
				return (
					<div
						action
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
						{letter}
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
