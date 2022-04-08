import React from 'react'
import PropTypes from 'prop-types'

function RadioStateItem({ playState }) {
	switch (playState) {
		case 'loading':
			return <p>Chargement en cours ...</p>
		case 'error':
			return <p>Erreur !</p>
		default:
			return <></>
	}
}

RadioStateItem.propTypes = {
	playState: PropTypes.oneOf(['neutral', 'loading', 'playing', 'error']),
}

export default RadioStateItem
