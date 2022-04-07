import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { generateDay, getDayFormated, imageFromWMOCode } from '../../../utils/utils'

export default function MeteoForecast({ meteo, closeDate }) {
	const meteoAfterDate = (index => {
		let finalMeteo = {}
		for (let i = index; i < meteo.hourly.time.length; i++) {
			finalMeteo = {
				...finalMeteo,
				[generateDay(meteo.hourly.time[i])]: [
					...(finalMeteo[generateDay(meteo.hourly.time[i])] ?? []),
					{
						time: meteo.hourly.time[i],
						temperature: meteo.hourly.apparent_temperature[i],
						prec: meteo.hourly.precipitation[i],
						temperature_2m: meteo.hourly.temperature_2m[i],
						weatherCode: meteo.hourly.weathercode[i],
						windspeed: meteo.hourly.windspeed_10m[i],
					},
				],
			}
		}
		return finalMeteo
	})(closeDate)

	return (
		<div className="h-100 w-100 p-0">
			<p className="m-0">Prévisions :</p>
			<div className="d-flex overflow-x-auto w-100">
				{Object.keys(meteoAfterDate).map((e, i) => {
					const data = meteoAfterDate[e]
					const index = data.length % 2
					return (
						<div key={`prev_item_day_${i}`}>
							<div className="d-inline-block h-100 w-100">
								<div className="d-inline h-100">
									<p className="text-center w-100 d-inline-block p-0 m-0">
										{getDayFormated(meteoAfterDate[e][index].time)}
									</p>
									<p className="text-center w-100 d-inline-block p-0 m-0">
										{meteoAfterDate[e][index].temperature_2m} °C
									</p>
									<JoliWeatherImage src={imageFromWMOCode(meteoAfterDate[e][index].weatherCode)} />
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

const JoliWeatherImage = styled.img`
	height: inherit;
	width: auto:
	min-width: 5em;
	min-height: 4.5em;
	display: inline-block;
`

MeteoForecast.propTypes = {
	meteo: PropTypes.object,
	closeDate: PropTypes.object,
}
