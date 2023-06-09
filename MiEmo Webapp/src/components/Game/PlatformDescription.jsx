import React from 'react'
import PropTypes from 'prop-types'

import { PlatformProps } from '../../proptypes/PlatformPropTypes'
import { Col, Row } from 'react-bootstrap'

export default function PlatformDescription({ platform }) {
	return (
		<div className="p-4 text-wrap text-break user-select-none">
			<div className="mx-auto w-min-content mb-2">
				<img src={platform.console_logo} className="w-auto h-8" />
			</div>
			<Row className="p-0">
				<Col md="3">
					<div className="d-flex flex-column">
						<img src={platform.console_preview} className="w-100 max-h-12" />
						<span className="text-center fw-bold fs-4">
							{platform.year_created} - {platform.end_year}
						</span>
					</div>
				</Col>
				<Col className="px-7 my-auto">
					<p className="fs-2">{platform.description}</p>
				</Col>
			</Row>
			<Row className="p-0 my-4">
				{platform.popular_games.map((game, index) => {
					return (
						<Col key={`popular_game_${index}`} className="d-flex flex-column">
							<img src={game.cover} className="w-50 mx-auto rounded" />
							<span className="text-center fs-4 fw-bold">{game.game_name}</span>
						</Col>
					)
				})}
				<Col className="d-flex flex-column">
					<span className="text-center fs-4 fw-bold">Jeux populaires</span>
					<img src={platform.controls} className="w-50 my-auto h-min-content mx-auto max-h-12" />
				</Col>
			</Row>
		</div>
	)
}

PlatformDescription.propTypes = {
	platform: PropTypes.shape(PlatformProps),
}
