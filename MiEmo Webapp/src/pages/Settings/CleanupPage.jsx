import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ProgressBar } from 'primereact/progressbar'

import AccentedButton from '../../components/ui/AccentedButton'

import { IoMdArrowRoundBack } from 'react-icons/io'
import CleanUp from '/img/cleanup.svg'

const baseDiff = 2 * 60

function CleanupPage() {
	const [percentage, setPercentage] = useState(100)
	const [intervalItem, setIntervalItem] = useState(null)

	useEffect(() => {
		const expDate = new Date()
		expDate.setMinutes(expDate.getMinutes() + 2)
		const interval = setInterval(() => {
			const dateDiff = expDate.getTime() / 1000 - new Date().getTime() / 1000
			setPercentage(((dateDiff * 100) / baseDiff) | 0)
			console.log('interval', percentage)
		}, 1000)
		setIntervalItem(interval)
		return () => {
			clearInterval(interval)
		}
	}, [])

	useEffect(() => {
		if (percentage <= 0) {
			clearInterval(intervalItem)
		}
	}, [percentage])

	return (
		<div className="p-5">
			<AccentedButton className="p-button-rounded px-1 py-1 align-middle" disabled={percentage > 0}>
				<Link to="/settings">
					<IoMdArrowRoundBack size="2em" color="black" />
				</Link>
			</AccentedButton>
			<div className="text-center">
				<h1>Mode nettoyage</h1>
				<h2>Activé</h2>
				<img src={CleanUp} />
			</div>
			<div className="w-75 mx-auto my-5">
				<ProgressBar value={percentage} showValue={false} style={{ height: '4px' }} />
			</div>
		</div>
	)
}

export default CleanupPage
