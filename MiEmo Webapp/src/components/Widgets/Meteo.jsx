import React, { useCallback, useEffect, useState } from 'react'

import styled from 'styled-components'
import { getClosedDate } from '../../utils/utils'

import WeatherImageFactory from '../../static/WeatherImageFactory'
import WeatherImage from '../../static/json/weatherImage.json'

import api from '../../api/'

import '../../static/css/height.css'
import '../../static/css/overflow.css'
import '../../static/css/flexboxes.css'
import '../../static/css/display.css'
import '../../static/css/width.css'

function Meteo() {
	const [meteo, setMeteo] = useState(null)
	const closeDate = !!meteo && getClosedDate(meteo.hourly.time)

	const fecthAPI = useCallback(() => {
		const execute = async () => {
			return api.weather.get(48.73684, 2.40081, [
				'temperature_2m',
				'relativehumidity_2m',
				'apparent_temperature',
				'precipitation',
				'windspeed_10m',
				'weathercode',
			])
		}

		execute()
			.then(res => setMeteo(res))
			.catch(err => console.log(err))
	})

	useEffect(() => {
		fecthAPI()
	}, [])

	const imageFromWMOCode = WMOCode => {
		return WeatherImageFactory[WeatherImage[WMOCode]]
	}

	return (
		<div className="h-100">
			{!meteo && <p>Aucune donnée météo disponible</p>}
			{!!meteo && (
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
				</div>
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
