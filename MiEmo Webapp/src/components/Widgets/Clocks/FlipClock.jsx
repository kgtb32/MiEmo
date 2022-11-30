import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FlipClockBase from 'x-react-flipclock'

import SizeMe from '../../layout/SizeMe'

import settings from '../../../settings/settings'

const minOfTwo = (one, two) => {
	if (one < two) {
		return one / 4
	} else {
		return two / 3
	}
}

const FlipClock = settings.isProd ? FlipClockBase.default : FlipClockBase

function DigitalClock() {
	const [clockSize, setClockSize] = useState(0)

	return (
		<SizeMe sizeChanged={({ width, height }) => setClockSize(minOfTwo(width, height))}>
			<JoliFlipClock>
				<FlipClock
					size={clockSize}
					type="clock"
					units={[
						{
							sep: ' ',
							type: 'hours',
						},
						{
							sep: ':',
							type: 'minutes',
						},
						{
							sep: ':',
							type: 'seconds',
						},
					]}
				/>
			</JoliFlipClock>
		</SizeMe>
	)
}

DigitalClock.propTypes = {
	size: PropTypes.shape({
		width: PropTypes.number,
		height: PropTypes.number,
	}),
}

const JoliFlipClock = styled.div`
	height: 100%;

	& > .FlipClock .flipUnitContainer {
		width: 100%;
		height: 100%;
	}

	& .lowerCard .upperCard {
		width: 100%;
		height: 50%;
	}

	& .FlipClock {
		width: 100%;
		height: 100%;
	}

	& .FlipClock .flipUnitContainer .flipCard.unfold {
		top: 50%;
		width: 100%;
		height: 50%;
	}
	& .FlipClock .flipUnitContainer .flipCard.fold {
		top: 0;
		width: 100%;
		height: 50%;
	}

	& .FlipClock span {
		font-size: ${props => (props.children.props.size ? props.children.props.size + 'px !important' : '0px')};
	}
`
export default DigitalClock
