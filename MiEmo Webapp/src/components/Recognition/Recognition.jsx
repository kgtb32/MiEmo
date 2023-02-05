import React, { useState, useRef, useCallback } from 'react'
import { ButtonOutlinedCustom } from '../../static/styledComponent/styled'
import styled from 'styled-components'
import RecognitionModal from './RecognitionModal'
import { Toast } from 'primereact/toast'

const Recognition = () => {
	const [isClick, setIsClick] = useState(false)
	const toast = useRef(null)
	const showInfo = useCallback(message => {
		toast.current.show({ severity: 'info', summary: 'MIEmo', detail: message, life: 3000 })
	}, [])

	return (
		<div>
			<Toast ref={toast} />
			<ButtonRecognitionCustom
				className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
				onClick={() => setIsClick(prev => !prev)}
				icon={isClick ? 'pi pi-stop-circle' : 'pi pi-microphone'}
				color={'white'}
				isclick={isClick.toString()}
			/>
			{isClick && <RecognitionModal isClick={isClick} setIsClick={setIsClick} showInfo={showInfo} />}
		</div>
	)
}

const ButtonRecognitionCustom = styled(ButtonOutlinedCustom)`
	color: ${props => props.isclick === 'true' && 'red !important'};
	border: ${props => props.isclick === 'true' && '2px solid red !important;'};
	background-color: ${props => props.isclick === 'true' && 'white !important;'};
`

export default React.memo(Recognition)
