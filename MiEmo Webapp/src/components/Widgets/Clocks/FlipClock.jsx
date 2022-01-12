import FlipClock from 'x-react-flipclock'
import { React } from 'react'
import styled from 'styled-components'

import { withSize } from 'react-sizeme'

const minOfTwo = (one, two) => {
	if (one < two) {
		return one / 4
	} else {
		return two / 3
	}
}

function DigitalClock({ size }) {
	const { width, height } = size
	return (
		<JoliFlipClock>
			<FlipClock
				size={minOfTwo(width, height)}
				type="clock"
				units={[
					{
						sep: ' ',
						type: 'hours',
						title: 'hour',
					},
					{
						sep: ':',
						type: 'minutes',
						title: 'minute',
					},
					{
						sep: ':',
						type: 'seconds',
						title: 'second',
					},
				]}
			/>
		</JoliFlipClock>
	)
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
export default withSize({ monitorHeight: true })(DigitalClock)
