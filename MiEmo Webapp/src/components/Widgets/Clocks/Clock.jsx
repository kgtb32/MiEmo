import { React, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import WidgetClock from 'react-clock'

import styled from 'styled-components'
import { withSize } from 'react-sizeme'

import 'react-clock/dist/Clock.css'

const minOfTwo = (one, two) => {
	if (one < two) {
		return one
	} else {
		return two
	}
}

function Clock({ size }) {
	const [value, setValue] = useState(new Date())

	useEffect(() => {
		const interval = setInterval(() => setValue(new Date()), 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	const clockSize = minOfTwo(size.height, size.width - 10)

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<JoliClock
				value={value}
				size={clockSize}
				style={{
					color: 'white',
				}}
			/>
		</div>
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
`

Clock.propTypes = {
	size: PropTypes.shape({
		height: PropTypes.number,
		width: PropTypes.number,
	}),
}

export default withSize({ monitorHeight: true })(Clock)
