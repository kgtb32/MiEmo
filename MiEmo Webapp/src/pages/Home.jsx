import React from 'react'
import { Link } from 'react-router-dom'

import GridLayout from '../components/layout/GridLayout'
import Store from '../components/Store/Store'
import Recognition from '../components/Recognition/Recognition'

import { ButtonOutlinedCustom } from '../static/styledComponent/styled'

import { IoGameControllerOutline } from 'react-icons/io5'
import { GiMirrorMirror } from 'react-icons/gi'
import MiemoLogo from '/img/logo_miror.png'

import useStoreContext from '../context/StoreContext'

export default function Home() {
	const { widgetEditMode, toggleWidgetEditMode } = useStoreContext()

	return (
		<div className="bg-dark" style={{ padding: 10 }}>
			{widgetEditMode && <Store />}
			<div className="d-flex justify-content-between flex-sm-row flex-column-reverse">
				<div className="d-flex my-auto justify-content-center justify-content-sm-start align-items-center align-items-sm-start flex-wrap flex-sm-nowrap">
					<div className="h-100 mx-sm-4 mt-2 mb-2 mt-sm-0 mb-sm-2">
						<img src={MiemoLogo} style={{ height: '4em' }} />
					</div>
				</div>
				<div
					className="d-flex justify-content-center align-items-center align-items-sm-stretch flex-wrap flex-sm-nowrap"
					style={{ padding: '1.5em' }}
				>
					<Link className="text-decoration-none">
						<Recognition />
					</Link>
					<Link className="text-decoration-none" to="/shadowme">
						<ButtonOutlinedCustom
							className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
							icon="pi"
							color="white"
						>
							<GiMirrorMirror />
						</ButtonOutlinedCustom>
					</Link>
					<Link to="/game" className="text-decoration-none">
						<ButtonOutlinedCustom
							className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
							icon="pi"
							color={'white'}
						>
							<IoGameControllerOutline size="22" color="#5EEAD4" className="mx-2" />
						</ButtonOutlinedCustom>
					</Link>
					<Link to="/settings" className="text-decoration-none">
						<ButtonOutlinedCustom
							className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
							icon="pi pi-cog"
							color={'white'}
						/>
					</Link>
					<Link className="text-decoration-none">
						<ButtonOutlinedCustom
							className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
							onClick={toggleWidgetEditMode}
							icon="pi pi-home"
							color={'white'}
						/>
					</Link>
				</div>
			</div>
			<GridLayout />
		</div>
	)
}
