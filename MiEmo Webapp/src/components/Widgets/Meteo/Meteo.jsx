import React, { useCallback, useEffect, useState } from 'react'

import styled from 'styled-components'
import { getClosedDate } from '../../../utils/utils'

import WeatherImageFactory from '../../../static/WeatherImageFactory'
import WeatherImage from '../../../static/json/weatherImage.json'
import MeteoForecast from './MeteoForecast'

import api from '../../../api'

import '../../../static/css/height.css'
import '../../../static/css/overflow.css'
import '../../../static/css/flexboxes.css'
import '../../../static/css/display.css'
import '../../../static/css/width.css'
import CitySelectorModal from './CitySelectorModal'
import { Button } from 'primereact/button'
import { Row, Col } from 'react-bootstrap'

function Meteo() {
	const [meteo, setMeteo] = useState(null)
	const [isModalVisible, setModalVisible] = useState(false)
	const [city, setCity] = useState({})

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

	const imageFromWMOCode = WMOCode => {
		return WeatherImageFactory[WeatherImage[WMOCode]]
	}

	const generateCity = city => {
		return (
			<div>
				<div>
					<span>Météo à</span>
					<span className="mx-1">{city.name}</span>{' '}
				</div>
				<span className={`fi fi-${city.country_code.toLowerCase()}`} />
				<span className="ml-1">({city.admin1})</span>
			</div>
		)
	}

	return (
		<div className="h-100">
			<Row>
				<Col>
					<Button onClick={() => setModalVisible(true)}>Changer ville</Button>
					{!city.name && (
						<>
							<p>Aucune ville choisie</p>
						</>
					)}
				</Col>
				<Col>{!!city.name && generateCity(city)}</Col>
			</Row>
			{isModalVisible && <CitySelectorModal setModalVisible={setModalVisible} setCity={setCity} />}

			{!meteo && <p>Aucune donnée météo disponible</p>}
			{!!meteo && !!city.name && (
				<>
					<div className="flex w100 h-100">
						<JoliWeatherImage src={imageFromWMOCode(meteo.hourly.weathercode[closeDate])} />
						<div className="flex-col w100">
							<div className="flex-row w100">
								<div className="flex-row w50">
									<JoliImageDescription src={WeatherImageFactory.thermometer} />
									<span>
										{meteo.hourly.temperature_2m[closeDate]} /{' '}
										{meteo.hourly.apparent_temperature[closeDate]}
									</span>
								</div>
								<div className="flex-row w50">
									<JoliImageDescription src={WeatherImageFactory.umbrella} />
									<span>{meteo.hourly.precipitation[closeDate]}</span>
								</div>
							</div>
							<div className="flex-row w100">
								<div className="flex-row w50">
									<JoliImageDescription src={WeatherImageFactory.humidity} />
									<span>{meteo.hourly.relativehumidity_2m[closeDate]}</span>
								</div>
								<div className="flex-row w50">
									<JoliImageDescription src={WeatherImageFactory.windsock} />
									<span>{meteo.hourly.windspeed_10m[closeDate]}</span>
								</div>
							</div>
						</div>
						<MeteoForecast closeDate={closeDate} meteo={meteo} />
					</div>
				</>
			)}
		</div>
	)
}

const JoliWeatherImage = styled.img`
	height: auto;
	width: auto;
`

const JoliImageDescription = styled.img`
	height: 3rem;
	width: auto;
`

export default Meteo
