import React from 'react'
import PropTypes from 'prop-types'

import Control from './Control'

import { BsJoystick } from 'react-icons/bs'
import { CgArrowsV } from 'react-icons/cg'

import settings from '../../settings/settings'

export const ControlsTypesList = ['platformSelect', 'gameSelect', 'gameLoad']
export default function ControlsSelector({ type, clickCallback }) {
	const generateButton = text => {
		return {
			o_button: (
				<Control
					badgeText="O"
					text={text}
					color="#000000"
					background="#2980b9"
					onClick={() => clickCallback(settings.buttons.button_o)}
				/>
			),
			x_button: (
				<Control
					badgeText="X"
					text={text}
					color="#FFFFFF"
					background="#c0392b"
					onClick={() => clickCallback(settings.buttons.button_x)}
				/>
			),
			a_button: (
				<Control
					badgeText="A"
					text={text}
					color="#000000"
					background="#f39c12"
					onClick={() => clickCallback(settings.buttons.button_a)}
				/>
			),
			b_button: (
				<Control
					badgeText="B"
					text={text}
					color="#FFFFFF"
					background="#27ae60"
					onClick={() => clickCallback(settings.buttons.button_b)}
				/>
			),
			joystick_updown: (
				<div className="d-flex">
					<BsJoystick size="2em" />
					<CgArrowsV size="2em" />
					<div className="fw-bold my-auto mx-1">{text}</div>
				</div>
			),
		}
	}

	const controlsViews = {
		platformSelect: (
			<div className="d-flex justify-content-between">
				{generateButton('Changer de plateforme').joystick_updown}
				{generateButton('Retour à MiEmo').o_button}
				{generateButton('Choisir').x_button}
			</div>
		),
		gameSelect: (
			<div className="d-flex justify-content-between">
				{generateButton('Changer de jeu').joystick_updown}
				{generateButton('Retour').o_button}
				{generateButton('Favori').b_button}
				{generateButton('Activer la musique').a_button}
				{generateButton('Jouer').x_button}
			</div>
		),
		gameLoad: <div className="d-flex">{generateButton('Retour').o_button}</div>,
		default: (
			<div className="d-flex">
				<Control />
			</div>
		),
	}

	return <div className="offset-bottom p-2 px-4">{controlsViews[type] ?? controlsViews.default}</div>
}

ControlsSelector.propTypes = {
	type: PropTypes.oneOf(ControlsTypesList),
	clickCallback: PropTypes.func.isRequired,
}

ControlsSelector.defaultProps = {
	type: 'plateformSelect',
	clickCallback: () => void 0,
}
