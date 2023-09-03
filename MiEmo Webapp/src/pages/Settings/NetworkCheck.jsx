import React from 'react'

import SettingsHeader from '../../components/Settings/SettingsHeader'
import AccentedButton from '../../components/ui/AccentedButton'

import { FaCheck } from 'react-icons/fa'
import { FcGlobe } from 'react-icons/fc'
import { GrPowerReset } from 'react-icons/gr'

function NetworkCheck() {
	return (
		<div className="px-4 py-4">
			<SettingsHeader headerTitle="Tester la connectivité" backUrl="/settings" />
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
						<AccentedButton>
							<GrPowerReset className="mx-1" />
							<span>Relancer le test</span>
						</AccentedButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NetworkCheck
