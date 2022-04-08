import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'

import { BsFillDiscFill } from 'react-icons/bs'
import { IoMdRadio } from 'react-icons/io'

import '../../../static/css/Spinner.css'

function RadioIcon({ favicon }) {
	return (
		<>
			{favicon == '' ? (
				<div className="px-auto w-min-content mx-auto d-inline-block">
					<IoMdRadio size="4em" />
				</div>
			) : (
				<img
					src={favicon}
					className="img-fluid img-thumbnail"
					style={{ borderRadius: '50%', height: '4em', width: '4em', objectFit: 'contain' }}
				/>
			)}
		</>
	)
}

RadioIcon.propTypes = {
	favicon: PropTypes.string,
}

function RadioListItem({ radioInfos, playState, currentRadio }) {
	return (
		<Row className="w-100 my-2 px-2">
			<Col>
				{playState == 'playing' && currentRadio == radioInfos.stationUuid ? (
					<span className="mx-1">
						<BsFillDiscFill className="miemo-anim-spinner" size="2em" />
					</span>
				) : (
					<RadioIcon favicon={radioInfos?.favicon} />
				)}
				<span>{radioInfos.name}</span>
			</Col>
		</Row>
	)
}

RadioListItem.propTypes = {
	radioInfos: PropTypes.shape({
		name: PropTypes.string,
		stationUuid: PropTypes.string,
		url: PropTypes.string,
		favicon: PropTypes.string,
		country: PropTypes.string,
		countryCode: PropTypes.string,
	}),
	playState: PropTypes.oneOf(['neutral', 'playing', 'error', 'loading']),
	currentRadio: PropTypes.string,
	options: PropTypes.object,
}

export default RadioListItem
