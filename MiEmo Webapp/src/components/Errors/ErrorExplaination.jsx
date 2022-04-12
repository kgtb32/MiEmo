import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Row } from 'react-bootstrap'
import { Button } from 'primereact/button'

import bugFixAsset from '/public/img/bug_fixing.svg'

function ErrorExplaination({ error }) {
	const [technicalMessageShown, setTechnicalMessageVisibility] = useState(false)

	return (
		<Row className="justify-content-center d-flex text-center w-100">
			<img className="w-25 h-auto" src={bugFixAsset} />
			<h1>Une erreur s&apos;est produite</h1>
			<p>Il semblerait que MiEmo à cessé de fonctionner</p>

			<div className="d-flex justify-content-around mx-auto w-50">
				<Button onClick={() => window.location.reload()}>Relancer MiEmo</Button>
				<Button>Réinitialiser MiEmo</Button>
				<Button onClick={() => setTechnicalMessageVisibility(!technicalMessageShown)}>
					{technicalMessageShown ? 'Masquer les détails techniques' : 'Afficher les détails techniques'}
				</Button>
			</div>
			{technicalMessageShown && (
				<div className="w-75 mx-auto mt-4 border">
					<p>Détails techniques</p>
					<p>{error}</p>
				</div>
			)}
		</Row>
	)
}

ErrorExplaination.propTypes = {
	error: PropTypes.string,
}

export default ErrorExplaination
