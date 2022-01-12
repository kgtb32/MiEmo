import { React, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import WidgetClock from 'react-clock'
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
			<WidgetClock value={value} size={clockSize} />
		</div>
	)
}

Clock.propTypes = {
	size: PropTypes.shape({
		height: PropTypes.number,
		width: PropTypes.number,
	}),
}

export default withSize({ monitorHeight: true })(Clock)
