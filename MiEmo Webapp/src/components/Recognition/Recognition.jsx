import React, { useState } from 'react'
import { ButtonOutlinedCustom } from '../../static/styledComponent/styled'
import styled from 'styled-components'
import RecognitionModal from './RecognitionModal'

const Recognition = () => {
	const [isClick, setIsClick] = useState(false)
	return (
		<div>
			<ButtonRecognitionCustom
				className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
				onClick={() => setIsClick(prev => !prev)}
				icon={isClick ? 'pi pi-stop-circle' : 'pi pi-microphone'}
				color={'white'}
				isClick={isClick}
			/>
			{isClick && <RecognitionModal isClick={isClick} setIsClick={setIsClick} />}
		</div>
	)
}

const ButtonRecognitionCustom = styled(ButtonOutlinedCustom)`
	color: ${props => props.isClick && 'red !important'};
	border: ${props => props.isClick && '2px solid red !important;'};
	background-color: ${props => props.isClick && 'white !important;'};
`

export default React.memo(Recognition)
