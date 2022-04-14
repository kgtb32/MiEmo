import React, { useState, useCallback, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { ProgressBar } from 'primereact/progressbar'

import { ListGroup } from 'react-bootstrap'

import WifiItem from '../../components/Settings/WifiItem'
import WifiPasswordSelector from '../../components/Settings/WifiPasswordSelector'

import { IoMdArrowRoundBack } from 'react-icons/io'
import { RiRefreshLine } from 'react-icons/ri'

import api from '../../api/'

import '../../static/css/Spinner.css'

function Wifi() {
	const [wifiList, setWifiList] = useState([])
	const [selectedWifiNetwork, setSelectedWifiNetwork] = useState({})
	const [modalVisible, setModalVisible] = useState(false)

	const fetchWifi = useCallback(() => {
		const fetch = async () => api.wifi.list()

		fetch().then(res => {
			setWifiList(res)
		})
	})

	useEffect(() => {
		fetchWifi()
		const interval = setInterval(() => fetchWifi(), 10000)
		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div className="p-4">
			<WifiPasswordSelector
				setModalVisible={setModalVisible}
				modalVisible={modalVisible}
				wifiInfos={selectedWifiNetwork}
			/>
			<div>
				<Button className="p-button-rounded px-1 py-1 align-middle">
					<Link to="/settings">
						<IoMdArrowRoundBack size="2em" color="black" />
					</Link>
				</Button>
				<h1 className="d-inline-block mx-2 h-100 align-middle mt-2">Wifi</h1>
			</div>
			<Divider />
			<h2>Réseaux disponibles</h2>
			<ListGroup>
				{wifiList
					.sort(a => (a['IN-USE'] == '*' ? -1 : 1))
					.map((e, i) => {
						const wifiInfo = {
							ssid: e?.SSID,
							security: e?.SECURITY,
							inUse: e['IN-USE'],
							signal: e?.SIGNAL,
						}
						return (
							<div
								key={'wifi_' + i}
								onClick={() => {
									if (wifiInfo.inUse != '*') {
										setSelectedWifiNetwork(wifiInfo)
										setModalVisible(true)
									}
								}}
							>
								<WifiItem networkInfos={wifiInfo} />
							</div>
						)
					})}
			</ListGroup>
			<div className="my-4">
				<div className="d-flex mx-auto justify-content-center">
					<RiRefreshLine className="miemo-anim-spinner mx-1" color="white" size="1.5em" />
					<p>Recherche des réseaux disponibles</p>
				</div>
				<ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
			</div>
		</div>
	)
}

export default Wifi
