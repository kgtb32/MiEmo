import React, { useState } from 'react'
import GridLayout from '../components/layout/GridLayout'
import { Link } from 'react-router-dom'

import { EventEmitter } from 'events'

import { Button } from 'primereact/button'

import Store from '../components/Store/Store'

import { MdSettings } from 'react-icons/md'
import { FaStore } from 'react-icons/fa'

export default function Home() {
	const addEvent = new EventEmitter()
	const [storeVisible, setStoreVisible] = useState(false)

	return (
		<div className="bg-dark" style={{ padding: 60 }}>
			{storeVisible && <Store addEvent={addEvent} />}
			<div className="d-flex justify-content-end">
				<Button className="p-button-rounded p-1 px-1 mx-1">
					<Link to="/settings">
						<MdSettings size="1.5em" color="black" />
					</Link>
				</Button>
				<Button className="p-button-rounded p-1 px-1 mx-1" onClick={() => setStoreVisible(!storeVisible)}>
					<FaStore size="1.5em" />
				</Button>
			</div>
			<GridLayout addEvent={addEvent} />
		</div>
	)
}
