import React from 'react'

import SettingsHeader from '../../components/Settings/SettingsHeader'
import ColorItem from '../../components/Settings/colors/ColorItem'
import { nanoid } from 'nanoid'
import settings from '../../settings/settings'
import useApplicationSettingsContext from '../../context/ApplicationSettingsContext'

export default function AccentColor() {
	const { selectedColor, setSelectedColor } = useApplicationSettingsContext()

	return (
		<div className="p-4">
			<SettingsHeader headerTitle="Couleur d'accentuation" backUrl="/settings" />
			<h2>Choix des couleurs</h2>
			<div className="d-flex mx-auto w-75 justify-content-between flex-wrap">
				{settings.app.accentColor.colors.map(c => (
					<ColorItem
						key={nanoid(128)}
						color={c.color}
						colorId={c?.id}
						selected={selectedColor == c.id}
						colorSelected={setSelectedColor}
					/>
				))}
			</div>
		</div>
	)
}
