import React from 'react'
import PropTypes from 'prop-types'

import { Divider } from 'primereact/divider'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import AccentedButton from '../ui/AccentedButton'

function SettingsHeader({ headerTitle, backUrl }) {
	return (
		<>
			<div>
				<AccentedButton className="p-button-rounded px-1 py-1 align-middle">
					<Link to={backUrl}>
						<IoMdArrowRoundBack size="2em" color="black" />
					</Link>
				</AccentedButton>
				<h1 className="d-inline-block mx-2 h-100 align-middle mt-2 user-select-none">{`${headerTitle}`}</h1>
			</div>
			<Divider />
		</>
	)
}

SettingsHeader.propTypes = {
	headerTitle: PropTypes.string,
	backUrl: PropTypes.string,
}

export default SettingsHeader
