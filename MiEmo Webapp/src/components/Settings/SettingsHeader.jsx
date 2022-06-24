import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'

function SettingsHeader({ headerTitle, backUrl }) {
	return (
		<>
			<div>
				<Button className="p-button-rounded px-1 py-1 align-middle">
					<Link to={backUrl}>
						<IoMdArrowRoundBack size="2em" color="black" />
					</Link>
				</Button>
				<h1 className="d-inline-block mx-2 h-100 align-middle mt-2">{`${headerTitle}`}</h1>
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
