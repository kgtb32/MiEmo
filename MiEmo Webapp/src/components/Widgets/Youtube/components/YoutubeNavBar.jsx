import React from 'react'
import { MdHomeFilled } from 'react-icons/md'
import styled from 'styled-components'

const YoutubeNavBar = () => {
	return (
		<DivContainer>
			<DivNavItem>
				<MdHomeFilled size={16} />
				<p style={{ margin: '0' }}>Home</p>
			</DivNavItem>
		</DivContainer>
	)
}

const DivContainer = styled.div`
	height: 20%;
	background-color: white;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: row;
	flex-wrap: wrap;
`
const DivNavItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-grow: 1;
	align-self: stretch;
	justify-content: center;
	color: red;
	border-bottom: 4px solid;
	border-top: 4px solid white;
`

export default YoutubeNavBar
