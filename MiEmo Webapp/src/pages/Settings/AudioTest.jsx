import React from 'react'

import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { Divider } from 'primereact/divider'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoVolumeLow, IoPlayCircle } from 'react-icons/io5'

function AudioTest() {
	const tests = [{ type: 'droite' }, { type: 'centre' }, { type: 'gauche' }]

	return (
		<div className="px-4 py-4">
			<div>
				<Button className="p-button-rounded px-1 py-1 align-middle">
					<Link to="/settings">
						<IoMdArrowRoundBack size="2em" color="black" />
					</Link>
				</Button>
				<h1 className="d-inline-block mx-2 h-100 align-middle mt-2">Tester l&apos;audio</h1>
			</div>
			<Divider />
			<div className="d-flex flex-column w-100">
				<div className="mx-auto w-100">
					<Button className="mx-auto d-block">
						<IoPlayCircle size="1.5em" />
						<span>Tester</span>
					</Button>
					<div className="d-flex w-100 justify-content-around">
						{tests.map(e => {
							return (
								<div className="text-center d-block" key={'vol_' + e.type}>
									<IoVolumeLow size="8em" />
									<p>{e.type}</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AudioTest
