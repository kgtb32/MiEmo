import React from 'react'
import GridLayout from '../components/layout/GridLayout'
import { Link } from 'react-router-dom'

import Store from '../components/Store/Store'

import useStoreContext from '../context/StoreContext'

import { IoGameControllerOutline } from 'react-icons/io5'

import MiemoLogo from '../logo_miror.png'

import { ButtonOutlinedCustom } from '../static/styledComponent/styled'

export default function Home() {
	const { widgetEditMode, toggleWidgetEditMode } = useStoreContext()

	return (
		<div className="bg-dark" style={{ padding: 10 }}>
			{widgetEditMode && <Store />}
			<div className="d-flex justify-content-between">
				<div className="d-flex my-auto">
					<div className="h-100 mx-4">
						<img src={MiemoLogo} style={{ height: '4em' }} />
					</div>
					<h1 className="my-auto">MiEmo</h1>
				</div>
				<div className="d-flex" style={{ padding: '1.5em' }}>
					<ButtonOutlinedCustom className="p-button-rounded p-1 px-1 mx-1 p-button-outlined" color={'white'}>
						<Link to="/game">
							<IoGameControllerOutline size="22" color="#5EEAD4" className="mx-2" />
						</Link>
					</ButtonOutlinedCustom>
					<Link to="/settings">
						<ButtonOutlinedCustom
							className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
							icon="pi pi-cog"
							color={'white'}
						/>
					</Link>
					<ButtonOutlinedCustom
						className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
						onClick={toggleWidgetEditMode}
						icon="pi pi-home"
						color={'white'}
					/>
				</div>
			</div>
			<GridLayout />
		</div>
	)
}
