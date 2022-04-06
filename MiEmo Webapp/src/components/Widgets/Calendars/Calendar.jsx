import React from 'react'
import { withSize } from 'react-sizeme'
import styled from 'styled-components'

import '@fullcalendar/react/dist/vdom'

const FullCalendar = React.lazy(() => import('@fullcalendar/react'))
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import bootstrapPlugin from '@fullcalendar/bootstrap'

function Calendar() {
	return (
		<JoliDiv className="h-100">
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
					right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
				}}
				buttonText={{
					prev: '<',
					next: '>',
					today: "aujourd'hui",
					month: 'mois',
					week: 'semaine',
					day: 'jour',
					list: 'liste',
				}}
				locales={'frLocale'}
				locale={'fr'}
				initialView="dayGridMonth"
				googleCalendarApiKey=""
				viewClassNames="view"
				events={{ googleCalendarId: '' }}
				height={'100%'}
				width={'100%'}
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
		color: white;
		text-decoration: none;
	}
`

export default withSize({ monitorHeight: true })(Calendar)
