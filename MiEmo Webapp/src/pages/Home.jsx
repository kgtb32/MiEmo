import React from 'react'

import { getColorFromSettings } from '../utils/utils'
import useStoreContext from '../context/StoreContext'
import useApplicationSettingsContext from '../context/ApplicationSettingsContext'

import { Link } from 'react-router-dom'

import GridLayout from '../components/layout/GridLayout'
import Store from '../components/Store/Store'
import Recognition from '../components/Recognition/Recognition'

import { ButtonOutlinedCustom } from '../static/styledComponent/styled'

import { IoGameControllerOutline } from 'react-icons/io5'
import { GiMirrorMirror } from 'react-icons/gi'

import MiemoLogo from '/img/logo_miror.png'
export default function Home() {
	const { selectedColor } = useApplicationSettingsContext()
	const color = getColorFromSettings(selectedColor)

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
						<Recognition fg={color} />
					</Link>
					<Link className="text-decoration-none" to="/shadowme">
						<ButtonOutlinedCustom
							className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
							icon="pi"
							color="white"
							fg={color}
						>
							<GiMirrorMirror color={color} />
						</ButtonOutlinedCustom>
					</Link>
					<Link to="/game" className="text-decoration-none">
						<ButtonOutlinedCustom
							className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
							icon="pi"
							color="white"
							fg={color}
						>
							<IoGameControllerOutline size="22" color={color} className="mx-2" />
						</ButtonOutlinedCustom>
					</Link>
					<Link to="/settings" className="text-decoration-none">
						<ButtonOutlinedCustom
							className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
							icon="pi pi-cog"
							color="white"
							fg={color}
						/>
					</Link>
					<Link className="text-decoration-none">
						<ButtonOutlinedCustom
							className="p-button-rounded p-1 px-1 mx-1 p-button-outlined"
							onClick={toggleWidgetEditMode}
							color="white"
							fg={color}
							icon="pi pi-home"
						/>
					</Link>
				</div>
			</div>
			<GridLayout />
		</div>
	)
}
