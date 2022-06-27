import React, { useState, useEffect } from 'react'

import { Form } from 'react-bootstrap'

import SettingsHeader from '../../components/Settings/SettingsHeader'

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
			<Form.Control
				type="text"
				onKeyUp={e => setCalendarId(e.target.value)}
				onChange={e => setCalendarId(e.target.value)}
				value={calendarId}
			/>
			<span className="text-muted">Clé API du calendrier google</span>
			<Form.Control
				type="text"
				onKeyUp={e => setApiKey(e.target.value)}
				onChange={e => setApiKey(e.target.value)}
				value={apiKey}
			/>
		</div>
	)
}

export default CalendarConfig
