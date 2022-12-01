import React from 'react'
import PropTypes from 'prop-types'

import { gamePropTypes } from '../../proptypes/gamePropTypes'

import { BsFillStarFill, BsFillPeopleFill } from 'react-icons/bs'

export default function GameDescription({ game }) {
	return (
		<div>
			<p className="text-center fw-bold fs-4">{game.name}</p>
			<img src={game.cover} className="w-30 mx-auto d-block rounded" />
			{game.year_created > 0 && <p className="text-center fw-bold fs-4">{game.year_created}</p>}
			<div className="text-center fs-4">
				<span className="mx-4 align-middle my-auto">
					Joué <b>{game.nb_played}</b> fois
				</span>
				{game.favorite && (
					<div className="mx-auto w-fit-content d-inline">
						<BsFillStarFill size="1.2em" color="yellow" />
						<span className="text-center mx-2 fs-4 fw-bold align-middle">Favori</span>
					</div>
				)}
				<div className="mx-4 d-inline">
					<BsFillPeopleFill size="1em" />
					<span>
						{' '}
						<b>{game.nb_player}</b> joueur(s)
					</span>
				</div>
			</div>
			<div className="mx-auto d-flex justify-around w-fit-content max-w-100 flex-wrap my-2">
				{game.genres.map((genre, index) => {
					return (
						<span
							key={`game_genre_${index}`}
							className="d-pill fw-bold mx-1 my-1"
							style={{
								background: genre.background,
								color: genre.color,
							}}
						>
							{genre.genre_name}
						</span>
					)
				})}
			</div>
		</div>
	)
}

GameDescription.propTypes = {
	game: PropTypes.shape(gamePropTypes),
}
