import styled from 'styled-components'
import AccentedButton from '../../components/ui/AccentedButton'

export const ButtonOutlinedCustom = styled(AccentedButton)`
	:enabled:active,
	:enabled:hover {
		background-color: ${props => props.color} !important;
	}
	color: ${props => props.fg} !important;
	background: transparent !important;

	width: 4em !important;
	height: 4em !important;

	:enabled:focus {
		box-shadow: none !important;
	}
`
