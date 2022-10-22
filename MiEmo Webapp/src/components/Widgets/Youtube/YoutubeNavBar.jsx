import React from 'react'
import { VscHistory } from 'react-icons/vsc'
import { MdOutlineFavorite } from 'react-icons/md'
import { IoSearchCircleOutline } from 'react-icons/io5'

const YoutubeNavBar = () => {
	return (
		<div
			style={{
				height: '20%',
				backgroundColor: 'white',
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
				flexDirection: 'row',
				flexWrap: 'wrap',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					color: 'black',
					alignItems: 'center',
					flexGrow: '1',
				}}
			>
				<VscHistory />
				<p style={{ margin: '0' }}>Historique</p>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					color: 'black',
					alignItems: 'center',
					flexGrow: '1',
				}}
			>
				<IoSearchCircleOutline />
				<p style={{ margin: '0' }}>Rechercher</p>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					color: 'black',
					alignItems: 'center',
					flexGrow: '1',
				}}
			>
				<MdOutlineFavorite />
				<p style={{ margin: '0' }}>Favoris</p>
			</div>
		</div>
	)
}

export default YoutubeNavBar
