import React, { useState } from 'react'
import styled from 'styled-components'

import '@fullcalendar/react/dist/vdom'

const FullCalendar = React.lazy(() => import('@fullcalendar/react'))
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import bootstrapPlugin from '@fullcalendar/bootstrap'

import useApplicationSettingsContext from '../../../context/ApplicationSettingsContext'

import { getColorFromSettings } from '../../../utils/utils'
import settings from '../../../settings/settings'

function Calendar() {
	const [calendarId] = useState(localStorage.getItem(settings.calendar.calIdLocalStorageVal) ?? '')
	const [apiKey] = useState(localStorage.getItem(settings.calendar.calApiKeyLocalStorageVal) ?? '')

	const { selectedColor } = useApplicationSettingsContext()
	const color = getColorFromSettings(selectedColor)

	return (
		<JoliDiv className="h-100" color={color}>
			<FullCalendar
				plugins={[
					dayGridPlugin,
					timeGridPlugin,
					interactionPlugin,
					listPlugin,
					bootstrapPlugin,
					googleCalendarPlugin,
				]}
				headerToolbar={{
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,listMonth',
				}}
				buttonText={{
					prev: '<',
					next: '>',
					today: "Aujourd'hui",
					month: 'Mois',
					list: 'Liste',
				}}
				locale={'fr'}
				allDayText={'Journée'}
				noEventsContent={'Rien à afficher'}
				initialView="dayGridMonth"
				googleCalendarApiKey={apiKey}
				viewClassNames="view"
				events={{ googleCalendarId: calendarId }}
				height={'100%'}
			/>
		</JoliDiv>
	)
}

const JoliDiv = styled.div`
	& .fc-col-header-cell-cushion {
		color: white;
		text-decoration: none;
	}
	& .fc-daygrid-day-number {
		click: false;
		color: white;
		text-decoration: none;
	}
	& .fc-daygrid-day-events {
		pointer-events: none;
	}

	& .fc-list-event {
		pointer-events: none;
	}
	& .fc-toolbar-title {
		text-transform: uppercase;
	}

	.fc-button {
		background: ${props => props?.color ?? 'transparent'} !important;
		border-color: ${props => props?.color ?? 'transparent'} !important;
	}

	.fc-button:focus {
		box-shadow: 0 0 0 0.2rem white !important;
	}
`
export default Calendar
