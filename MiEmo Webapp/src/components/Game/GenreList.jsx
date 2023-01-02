import React from 'react'
import PropTypes from 'prop-types'

export default function GenreList({ currentGenre, setCurrentGenre, genres }) {
	return (
		<div className="d-flex flex-row w-100 flex-wrap justify-content-center">
			{genres.map((genre, index) => {
				return (
					<div
						key={`genre-scroll-${index}`}
						className={`h-min-content p-2 mx-1 rounded text-center my-1 user-select-none ${
							currentGenre == index ? 'beauty-background' : ''
						}`}
						onClick={() => setCurrentGenre(index)}
					>
						{genre.toLowerCase()}
					</div>
				)
			})}
		</div>
	)
}

GenreList.propTypes = {
	currentGenre: PropTypes.number.isRequired,
	setCurrentGenre: PropTypes.func.isRequired,
	genres: PropTypes.array,
}

GenreList.defaultProps = {
	genres: [],
}
