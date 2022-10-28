import React, { useState, useEffect } from 'react'
import { VscHistory } from 'react-icons/vsc'
import { MdOutlineFavorite } from 'react-icons/md'
import { HiOutlineSearch } from 'react-icons/hi'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const YoutubeNavBar = props => {
	const [navItem, setNavItem] = useState({ history: false, search: true, favorites: false })
	const changeValue = (history, search, favorites) => {
		return { history: history, search: search, favorites: favorites }
	}

	useEffect(() => {
		props.setNavItemChange(navItem)
	}, [navItem])

	return (
		<DivContainer>
			<DivNavItem navItem={navItem.history} onClick={() => setNavItem(changeValue(true, false, false))}>
				<VscHistory />
				<p style={{ margin: '0' }}>Historique</p>
			</DivNavItem>
			<DivNavItem navItem={navItem.search} onClick={() => setNavItem(changeValue(false, true, false))}>
				<HiOutlineSearch size={16} />
				<p style={{ margin: '0' }}>Rechercher</p>
			</DivNavItem>
			<DivNavItem navItem={navItem.favorites} onClick={() => setNavItem(changeValue(false, false, true))}>
				<MdOutlineFavorite />
				<p style={{ margin: '0' }}>Favoris</p>
			</DivNavItem>
		</DivContainer>
	)
}

YoutubeNavBar.propTypes = {
	setNavItemChange: PropTypes.func.isRequired,
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
	color: ${props => (props.navItem ? 'red' : 'black')};
	border-bottom: ${props => (props.navItem ? '4px solid' : 'none')};
	border-top: ${props => (props.navItem ? '4px solid white' : 'none')};
	&:hover {
		color: white;
		border-bottom: 4px solid #ff000091;
		background-color: #ff9c9c;
		font-weight: 400;
		border-top: 4px solid #ff9c9c;
	}
`

export default YoutubeNavBar
