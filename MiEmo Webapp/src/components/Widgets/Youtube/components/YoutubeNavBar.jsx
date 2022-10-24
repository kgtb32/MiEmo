import React, { useState, useEffect } from 'react'
import { VscHistory } from 'react-icons/vsc'
import { MdOutlineFavorite } from 'react-icons/md'
import { HiOutlineSearch } from 'react-icons/hi'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const YoutubeNavBar = props => {
	const [navItem, setNavItem] = useState({ history: false, search: true, favorites: false })
	const [isHover, setIsHover] = useState({ history: false, search: true, favorites: false })
	const changeValue = (history, search, favorites) => {
		return { history: history, search: search, favorites: favorites }
	}

	useEffect(() => {
		props.setNavItemChange(navItem)
	}, [navItem])

	const MouseOutStyle = value => {
		return {
			color: navItem[value] ? 'red' : 'black',
			borderBottom: navItem[value] ? '4px solid' : 'none',
			borderTop: navItem[value] ? '4px solid white' : 'none',
		}
	}

	const ColorSearch = isHover.search && !navItem.search ? MouseHoverStyle : MouseOutStyle('search')
	const History = isHover.history && !navItem.history ? MouseHoverStyle : MouseOutStyle('history')
	const Favorites = isHover.favorites && !navItem.favorites ? MouseHoverStyle : MouseOutStyle('favorites')

	return (
		<DivContainer>
			<DivNavItem
				style={History}
				onClick={() => setNavItem(changeValue(true, false, false))}
				onMouseEnter={() => setIsHover(changeValue(true, false, false))}
				onMouseLeave={() => setIsHover(changeValue(false, false, false))}
			>
				<VscHistory />
				<p style={{ margin: '0' }}>Historique</p>
			</DivNavItem>
			<DivNavItem
				style={ColorSearch}
				onClick={() => setNavItem(changeValue(false, true, false))}
				onMouseEnter={() => setIsHover(changeValue(false, true, false))}
				onMouseLeave={() => setIsHover(changeValue(false, false, false))}
			>
				<HiOutlineSearch size={16} />
				<p style={{ margin: '0' }}>Rechercher</p>
			</DivNavItem>
			<DivNavItem
				style={Favorites}
				onClick={() => setNavItem(changeValue(false, false, true))}
				onMouseEnter={() => setIsHover(changeValue(false, false, true))}
				onMouseLeave={() => setIsHover(changeValue(false, false, false))}
			>
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
`
export const MouseHoverStyle = {
	color: 'white',
	borderBottom: '4px solid #ff000091',
	backgroundColor: '#ff9c9c',
	fontWeight: 'bolder',
	borderTop: '4px solid #ff9c9c',
}

export default YoutubeNavBar
