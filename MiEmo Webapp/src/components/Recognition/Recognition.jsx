import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import RecognitionModal from './RecognitionModal'

import { ButtonOutlinedCustom } from '../../static/styledComponent/styled'

const Recognition = ({ fg }) => {
	const [isClick, setIsClick] = useState(false)

	return (
		<div>
			<ButtonRecognitionCustom
				className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
				onClick={() => setIsClick(prev => !prev)}
				icon={isClick ? 'pi pi-stop-circle' : 'pi pi-microphone'}
				color={'white'}
				isclick={isClick.toString()}
				fg={fg}
			/>
			{isClick && <RecognitionModal isClick={isClick} setIsClick={setIsClick} />}
		</div>
	)
}

Recognition.propTypes = {
	fg: PropTypes.string,
}

const ButtonRecognitionCustom = styled(ButtonOutlinedCustom)`
	color: ${props => props.fg};
	border: ${props => props.isclick === 'true' && '2px solid red !important;'};
	background-color: ${props => props.isclick === 'true' && 'white !important;'};
`

export default React.memo(Recognition)
