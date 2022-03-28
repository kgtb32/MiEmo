import React from 'react'
import GridLayout from '../components/layout/GridLayout'

import { Button } from 'primereact/button'

import { MdSettings } from 'react-icons/md'
import { FaStore } from 'react-icons/fa'

export default function Home() {
	return (
		<div className="bg-dark" style={{ padding: 60 }}>
			<div className="d-flex justify-content-end">
				<Button className="p-button-rounded p-1 px-1 mx-1">
					<FaStore size="1.5em" />
				</Button>
				<Button className="p-button-rounded p-1 px-1 mx-1">
					<MdSettings size="1.5em" />
				</Button>
			</div>
			<GridLayout />
		</div>
	)
}
