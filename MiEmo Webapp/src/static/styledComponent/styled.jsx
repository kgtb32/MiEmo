import styled from 'styled-components'
import { Button } from 'primereact/button'

export const ButtonOutlinedCustom = styled(Button)`
	:enabled:active,
	:enabled:hover {
		background-color: ${props => props.color} !important;
	}

	width: 4em !important;
	height: 4em !important;

	:enabled:focus {
		box-shadow: none !important;
	}
`
