import React, { useState, useEffect } from 'react'

import SettingsHeader from '../../components/Settings/SettingsHeader'
import KeyboardedInput from '../../components/layout/KeyboardedInput'

import settings from '../../settings/settings'

function CalendarConfig() {
	const [calendarId, setCalendarId] = useState(localStorage.getItem(settings.calendar.calIdLocalStorageVal) ?? '')
	const [apiKey, setApiKey] = useState(localStorage.getItem(settings.calendar.calApiKeyLocalStorageVal) ?? '')

	useEffect(() => {
		localStorage.setItem(settings.calendar.calIdLocalStorageVal, calendarId)
	}, [calendarId])

	useEffect(() => {
		localStorage.setItem(settings.calendar.calApiKeyLocalStorageVal, apiKey)
	}, [apiKey])

	return (
		<div className="p-4">
			<SettingsHeader headerTitle="Paramètres du calendrier" backUrl="/settings" />
			<span className="text-muted">Id du calendrier google</span>
			<KeyboardedInput
				setValue={setCalendarId}
				value={calendarId}
				props={{
					className: 'w-100',
				}}
			/>
			<span className="text-muted">Clé API du calendrier google</span>
			<KeyboardedInput
				setValue={setApiKey}
				value={apiKey}
				props={{
					className: 'w-100',
				}}
			/>
		</div>
	)
}

export default CalendarConfig
