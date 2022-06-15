import React from 'react'

import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { Divider } from 'primereact/divider'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { FcGlobe } from 'react-icons/fc'
import { FaCheck } from 'react-icons/fa'
import { GrPowerReset } from 'react-icons/gr'

function NetworkCheck() {
	return (
		<div className="px-4 py-4">
			<div>
				<Button className="p-button-rounded px-1 py-1 align-middle">
					<Link to="/settings">
						<IoMdArrowRoundBack size="2em" color="black" />
					</Link>
				</Button>
				<h1 className="d-inline-block mx-2 h-100 align-middle mt-2">Tester la connectivité</h1>
			</div>
			<Divider />
			<div className="d-flex ">
				<FcGlobe size="10em" />
				<div className="d-flex flex-column h-100 my-auto mx-5">
					<p>Résultats du test de connexion :</p>
					<p>
						Connecté à internet : <FaCheck color="lime" />
					</p>
					<p>Vitesse de connexion : ↑ 1.6Mb/s / ↓ 256Kb/s </p>
					<p>
						Les conditions de fonctionnement de miemo sont <span className="color-green">OPTIMALES</span>
					</p>
					<div>
						<Button>
							<GrPowerReset className="mx-1" />
							<span>Relancer le test</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NetworkCheck
