import React from 'react'
import GridLayout from '../components/layout/GridLayout'
import { Link } from 'react-router-dom'

import { Button } from 'primereact/button'

import Store from '../components/Store/Store'

import { MdSettings } from 'react-icons/md'
import { FaStore } from 'react-icons/fa'
import useStoreContext from '../context/StoreContext'

export default function Home() {
	const { widgetEditMode, toggleWidgetEditMode } = useStoreContext()

	return (
		<div className="bg-dark" style={{ padding: 10 }}>
			{widgetEditMode && <Store />}
			<div className="d-flex justify-content-end">
				<Button className="p-button-rounded p-1 px-1 mx-1">
					<Link to="/settings">
						<MdSettings size="1.5em" color="black" />
					</Link>
				</Button>
				<Button className="p-button-rounded p-1 px-1 mx-1" onClick={toggleWidgetEditMode}>
					<FaStore size="1.5em" />
				</Button>
			</div>
			<GridLayout />
		</div>
	)
}
