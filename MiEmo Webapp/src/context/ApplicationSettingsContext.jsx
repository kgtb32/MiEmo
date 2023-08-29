import React, { createContext, useState, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import settings from '../settings/settings'

export const ApplicationSettingsContext = createContext()

export const ApplicationSettingsProvider = props => {
	const getSavedSelectedColor = () =>
		window.localStorage.getItem(settings.app.accentColor.key ?? settings.app.accentColor.defaultValue)
	const saveSelectedColor = value => window.localStorage.setItem(settings.app.accentColor.key, value)

	const [selectedColor, setSelectedColor] = useState(getSavedSelectedColor())

	const value = useMemo(
		() => ({
			selectedColor,
			setSelectedColor: c => {
				setSelectedColor(c)
				saveSelectedColor(c)
			},
		}),
		[selectedColor],
	)

	return <ApplicationSettingsContext.Provider value={value}>{props.children}</ApplicationSettingsContext.Provider>
}

ApplicationSettingsProvider.propTypes = {
	children: PropTypes.node,
}

const useApplicationSettingsContext = () => {
	return useContext(ApplicationSettingsContext)
}

export default useApplicationSettingsContext
