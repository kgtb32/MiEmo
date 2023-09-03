import React, { useEffect, useState, useRef } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Divider } from 'primereact/divider'
import { Toast } from 'primereact/toast'
import { ConfirmDialog } from 'primereact/confirmdialog'

import SettingsHeader from '../../components/Settings/SettingsHeader'
import AccentedProgressBar from '../../components/ui/AccentedProgressBar'

import { FaBluetooth } from 'react-icons/fa'
import { RiRefreshLine } from 'react-icons/ri'

import api from '../../api/'

export default function Bluetooth() {
	const [bluetoothPeripherals, setBluetoothPeripherals] = useState([])
	const [pairedDevices, setPairedDevices] = useState([])
	const toast = useRef(null)

	const apiCalls = {
		bluetoothDevices: () => {
			const fetchAPI = async () => api.bluetooth.list()
			fetchAPI()
				.then(res => setBluetoothPeripherals(res))
				.catch()
		},
		startDiscovery: () => {
			const fetchAPI = async () => api.bluetooth.startDiscovery()
			fetchAPI().then().catch()
		},
		endDiscovery: () => {
			const fetchAPI = async () => api.bluetooth.endDiscovery()
			fetchAPI().then().catch()
		},
		connect: mac => {
			const fetchAPI = async () => api.bluetooth.connect(mac)
			fetchAPI().then().catch()
		},
		remove: mac => {
			const fetchAPI = async () => api.bluetooth.remove(mac)
			fetchAPI().then().catch()
		},
		pairedDevices: () => {
			const fetchAPI = async () => api.bluetooth.pairedDevices()
			fetchAPI()
				.then(res => setPairedDevices(res))
				.catch()
		},
	}

	useEffect(() => {
		apiCalls.startDiscovery()
		return () => {
			apiCalls.endDiscovery()
		}
	}, [])

	useEffect(() => {
		apiCalls.bluetoothDevices()
		apiCalls.pairedDevices()
		const interval = setInterval(() => {
			apiCalls.bluetoothDevices()
			apiCalls.pairedDevices()
		}, 10000)
		return () => {
			clearInterval(interval)
		}
	}, [])

	const peripheralTemplate = ({ name, mac }, i, deleteMode) => (
		<ListGroup.Item
			key={`peripheral_bt_${i}`}
			action
			onClick={() => (deleteMode ? void 0 : apiCalls.connect(mac ?? ''))}
		>
			<FaBluetooth size="2em" />
			<span className="mx-2">{`${name ?? 'Aucun nom'}`}</span>
		</ListGroup.Item>
	)

	return (
		<div className="p-4">
			<Toast ref={toast} position="top-center" />
			<ConfirmDialog />
			<SettingsHeader headerTitle="Paramètres bluetooth" backUrl="/settings" />
			<div className="my-4">
				{pairedDevices.length > 0 && (
					<>
						<span>Périphériques appairés :</span>
						{pairedDevices.map((peripheral, i) => peripheralTemplate(peripheral, i, false))}
						<Divider />
					</>
				)}
			</div>
			<div className="my-4">
				<span>Périphériques disponibles :</span>
				<ListGroup>
					{bluetoothPeripherals.length == 0 && (
						<p className="text-center my-5">
							Aucun périphérique bluetooth trouvé, la recherche continue ...
						</p>
					)}
					{bluetoothPeripherals.map((peripheral, i) => peripheralTemplate(peripheral, i, false))}
				</ListGroup>
				<Divider />
			</div>
			<div className="my-4">
				<div className="d-flex mx-auto justify-content-center">
					<RiRefreshLine className="miemo-anim-spinner mx-1" color="white" size="1.5em" />
					<p>Recherche des périphériques disponibles</p>
				</div>
				<AccentedProgressBar mode="indeterminate" style={{ height: '6px' }}></AccentedProgressBar>
			</div>
		</div>
	)
}
