import { React, useEffect, useState } from 'react'
import WidgetClock from 'react-clock'
import SizeMe from '../../layout/SizeMe'

import styled from 'styled-components'
import 'react-clock/dist/Clock.css'

const minOfTwo = (one, two) => {
	if (one < two) {
		return one
	} else {
		return two
	}
}

function Clock() {
	const [value, setValue] = useState(new Date())
	const [clockSize, setClockSize] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => setValue(new Date()), 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<SizeMe sizeChanged={({ height, width }) => setClockSize(minOfTwo(height, width - 10))}>
			<div className="h-100 w-100">
				<JoliClock className="mx-auto" size={clockSize} value={value} style={{ color: 'white' }} />
			</div>
		</SizeMe>
	)
}

const JoliClock = styled(WidgetClock)`
	& > * {
		border-color: white;
	}

	& .react-clock__mark__body {
		background-color: white;
	}

	& .react-clock__hand__body {
		background-color: white;
	}

	& .react-clock__second-hand__body {
		background-color: red;
	}

	& .react-clock__face {
		border-color: white;
	}
`

export default Clock
