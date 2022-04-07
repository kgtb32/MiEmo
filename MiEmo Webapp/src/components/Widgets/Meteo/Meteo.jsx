import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Button } from 'primereact/button'
import { Row, Col } from 'react-bootstrap'

const MeteoForecast = React.lazy(() => import('./MeteoForecast'))

const CitySelectorModal = React.lazy(() => import('./CitySelectorModal'))

import { getClosedDate, imageFromWMOCode, loadLocalStorageKeyAsJsonObject } from '../../../utils/utils'
import api from '../../../api'

import WeatherImageFactory from '../../../static/WeatherImageFactory'

import { FiEdit } from 'react-icons/fi'

function Meteo() {
	const [meteo, setMeteo] = useState(null)
	const [isModalVisible, setModalVisible] = useState(false)
	const [city, setCity] = useState(loadLocalStorageKeyAsJsonObject('com.miemo.meteo.city', {}))

	useEffect(() => {
		localStorage.setItem('com.miemo.meteo.city', JSON.stringify(city))
	}, [city])

	const closeDate = !!meteo && getClosedDate(meteo.hourly.time)

	const fecthAPI = useCallback(myCity => {
		const execute = async () => {
			return api.weather.get(myCity.latitude, myCity.longitude, [
				'temperature_2m',
				'relativehumidity_2m',
				'apparent_temperature',
				'precipitation',
				'windspeed_10m',
				'weathercode',
			])
		}

		if (myCity.name) {
			execute()
				.then(res => {
					setMeteo(res)
				})
				.catch(err => console.log(err))
		}
	})

	useEffect(() => {
		fecthAPI(city)
	}, [city])

	const generateCity = currentCity => {
		return (
			<div className="w-100">
				<div className="d-flex justify-content-between h-100">
					<span className={`fi fi-${currentCity.country_code.toLowerCase()} mx-1 align-middle h-100`} />
					<span className="ml-1 align-middle h-100 text-truncate	">
						{currentCity.name} ({currentCity.admin1})
					</span>
					<Button className="p-button-rounded p-1 px-2" onClick={() => setModalVisible(true)}>
						<FiEdit />
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className="h-100">
			{isModalVisible && <CitySelectorModal setModalVisible={setModalVisible} setCity={setCity} />}
			{!city.name && (
				<div className="text-center">
					<p>Aucune ville choisie</p>
					<Button onClick={() => setModalVisible(true)}>Sélectionner une ville</Button>
				</div>
			)}
			{!!meteo && !!city.name && (
				<div className="d-flex flex-column h-100 overflow-hidden">
					{generateCity(city)}
					<Row className="h-100 w-100">
						<Col md={4} className="h-100 col-4">
							<JoliWeatherImage src={imageFromWMOCode(meteo.hourly.weathercode[closeDate])} />
						</Col>
						<Col className="h-100 col-4" md={4}>
							<Row>
								<div className="d-flex flex-row p-0 w-100">
									<JoliImageDescription src={WeatherImageFactory.thermometer} />
									<span>{meteo.hourly.temperature_2m[closeDate]}°C</span>
								</div>
							</Row>
							<Row>
								<div className="d-flex flex-row w-100 p-0">
									<JoliImageDescription src={WeatherImageFactory.umbrella} />
									<div className="d-flex flex-column text-center">
										<span>{meteo.hourly.precipitation[closeDate]}</span>
										<span>mm</span>
									</div>
								</div>
							</Row>
						</Col>
						<Col md={4} className="col-4">
							<Row>
								<div className="d-flex flex-row w-100 p-0">
									<JoliImageDescription src={WeatherImageFactory.humidity} />
									<span>{meteo.hourly.relativehumidity_2m[closeDate]}%</span>
								</div>
							</Row>
							<Row>
								<div className="d-flex flex-row w-100 p-0">
									<JoliImageDescription src={WeatherImageFactory.windsock} />
									<div className="d-flex flex-column">
										<div className="d-flex flex-column text-center">
											<span>{meteo.hourly.windspeed_10m[closeDate]}</span>
											<span>km/h</span>
										</div>
									</div>
								</div>
							</Row>
						</Col>
					</Row>
					<Row className="h-100 w-100 p-0 m-0">
						<MeteoForecast closeDate={closeDate} meteo={meteo} />
					</Row>
				</div>
			)}
		</div>
	)
}

const JoliWeatherImage = styled.img`
	height: 100%;
	width: 100%;
	margin: auto;
	aspect-ratio: 2/1;
	padding: 0px;
	display: block;
`

const JoliImageDescription = styled.img`
	height: 2.25rem;
	width: auto;
`

export default Meteo
