import React from 'react'

import SettingsHeader from '../../components/Settings/SettingsHeader'
import AccentedButton from '../../components/ui/AccentedButton'

import { IoPlayCircle, IoVolumeLow } from 'react-icons/io5'

function AudioTest() {
	const tests = [{ type: 'droite' }, { type: 'centre' }, { type: 'gauche' }]

	return (
		<div className="px-4 py-4">
			<SettingsHeader headerTitle="Tester l'audio" backUrl="/settings" />
			<div className="d-flex flex-column w-100">
				<div className="mx-auto w-100">
					<AccentedButton className="mx-auto d-block">
						<IoPlayCircle size="1.5em" />
						<span>Tester</span>
					</AccentedButton>
					<div className="d-flex w-100 justify-content-around">
						{tests.map(e => {
							return (
								<div className="text-center d-block" key={'vol_' + e.type}>
									<IoVolumeLow size="8em" />
									<p>{e.type}</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AudioTest
