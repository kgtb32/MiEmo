import React, { useState, useCallback, useEffect } from 'react'

import { ListGroup } from 'react-bootstrap'

import WifiItem from '../../components/Settings/WifiItem'
import WifiPasswordSelector from '../../components/Settings/WifiPasswordSelector'
import SettingsHeader from '../../components/Settings/SettingsHeader'

import { RiRefreshLine } from 'react-icons/ri'

import api from '../../api/'

import '../../static/css/Spinner.css'
import AccentedProgressBar from '../../components/ui/AccentedProgressBar'

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
			<SettingsHeader headerTitle="Wifi" backUrl="/settings" />
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
				<AccentedProgressBar mode="indeterminate" style={{ height: '6px' }}></AccentedProgressBar>
			</div>
		</div>
	)
}

export default Wifi
