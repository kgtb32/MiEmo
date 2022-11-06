import React from 'react'
import GridLayout from '../components/layout/GridLayout'
import { Link } from 'react-router-dom'

import { Button } from 'primereact/button'

import Store from '../components/Store/Store'

import useStoreContext from '../context/StoreContext'

import { MdSettings } from 'react-icons/md'
import { FaStore } from 'react-icons/fa'
import { IoLogoGameControllerB } from 'react-icons/io'

import MiemoLogo from '../logo_miror.png'

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
					<Button className="p-button-rounded p-1 px-1 mx-1">
						<Link to="/game">
							<IoLogoGameControllerB size="1.8em" color="black" />
						</Link>
					</Button>
					<Button className="p-button-rounded p-1 px-1 mx-1">
						<Link to="/settings">
							<MdSettings size="1.8em" color="black" />
						</Link>
					</Button>
					<Button className="p-button-rounded p-1 px-1 mx-1" onClick={toggleWidgetEditMode}>
						<FaStore size="1.8em" />
					</Button>
				</div>
			</div>
			<GridLayout />
		</div>
	)
}
