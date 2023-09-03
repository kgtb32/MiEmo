import React from 'react'

import SettingsHeader from '../../components/Settings/SettingsHeader'
import AccentedSwitch from '../../components/ui/AccentedSwitch'
import useApplicationSettingsContext from '../../context/ApplicationSettingsContext'

export default function VirtualKeyboard() {
	const { enableVirtualKeyboard, setEnableVirtualKeyboard } = useApplicationSettingsContext()

	return (
		<div className="p-4">
			<SettingsHeader headerTitle="Clavier virtuel" backUrl="/settings" />
			<div className="d-flex">
				<AccentedSwitch checked={enableVirtualKeyboard} onChange={e => setEnableVirtualKeyboard(e.value)} />
				<p className="d-inline-block mx-2 font-bold align-middle">Clavier virtuel</p>
			</div>
		</div>
	)
}
