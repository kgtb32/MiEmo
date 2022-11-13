import styled from 'styled-components'
import { Button } from 'primereact/button'

export const ButtonOutlinedCustom = styled(Button)`
	:enabled:active,
	:enabled:hover {
		background-color: ${props => props.color} !important;
	}

	:enabled:focus {
		box-shadow: none !important;
	}
`
