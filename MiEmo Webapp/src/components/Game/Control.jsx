import React from 'react'
import PropTypes from 'prop-types'

export default function Control({ badgeText, text, color, background, onClick }) {
	return (
		<div className="d-flex" onClick={onClick}>
			<div
				style={{
					color,
					background,
				}}
				className="w-1 h-1 circle d-flex"
			>
				<span className="user-select-none d-block my-auto mx-auto fw-bold fs-5 h-min-content">{badgeText}</span>
			</div>
			<span className="user-select-none my-auto mx-1 fw-bold d-block h-min-content">{text}</span>
		</div>
	)
}

Control.propTypes = {
	text: PropTypes.string.isRequired,
	badgeText: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	background: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
}

Control.defaultProps = {
	text: '-----',
	badgeText: '-',
	color: '#000000',
	background: '#FF0000',
	onClick: () => void 0,
}
