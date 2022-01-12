import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Chart } from 'primereact/chart'
import { Dropdown } from 'react-bootstrap'

export default function MeteoForecast({ meteo, closeDate }) {
	const [selectedMode, setMode] = useState('temperature')

	const meteoAfterDate = (index => {
		let finalMeteo = {}
		for (let i = index; i < meteo.hourly.time.length; i++) {
			finalMeteo = {
				time: [...(finalMeteo.time ?? []), meteo.hourly.time[i]],
				temperature: [...(finalMeteo.temperature ?? []), meteo.hourly.apparent_temperature[i]],
				prec: [...(finalMeteo.prec ?? []), meteo.hourly.precipitation[i]],
				temperature_2m: [...(finalMeteo.temperature_2m ?? []), meteo.hourly.temperature_2m[i]],
				weatherCode: [...(finalMeteo.weathercode ?? []), meteo.hourly.weathercode[i]],
				windspeed: [...(finalMeteo.windspeed ?? []), meteo.hourly.windspeed_10m[i]],
			}
		}
		return finalMeteo
	})(closeDate)

	const graphData = {
		temperature: {
			labels: meteoAfterDate.time,
			datasets: [
				{
					label: 'Température',
					data: meteoAfterDate.temperature_2m,
					fill: true,
					borderColor: '#e74c3c',
					tension: 0.4,
				},
			],
		},
		prec: {
			labels: meteoAfterDate.time,
			datasets: [
				{
					label: 'Précipitations',
					data: meteoAfterDate.prec,
					fill: true,
					borderColor: '#2980b9',
					tension: 0.4,
				},
			],
		},
		windspeed: {
			labels: meteoAfterDate.time,
			datasets: [
				{
					label: 'Vitesse du vent',
					data: meteoAfterDate.windspeed,
					fill: true,
					borderColor: '#e67e22',
					tension: 0.4,
				},
			],
		},
	}

	const multiAxisOptions = {
		stacked: false,
		maintainAspectRatio: true,
		aspectRatio: 1,
		plugins: {
			legend: {
				labels: {
					color: '#495057',
				},
			},
		},
		scales: {
			x: {
				ticks: {
					color: '#495057',
				},
				grid: {
					color: '#ebedef',
				},
			},
			y: {
				type: 'linear',
				display: true,
				position: 'left',
				ticks: {
					color: '#495057',
				},
				grid: {
					color: '#ebedef',
				},
			},
		},
	}

	console.log(meteoAfterDate)

	return (
		<div>
			<p>Prévisions</p>
			<div>
				<Chart type="line" data={graphData[selectedMode]} options={multiAxisOptions} />
				<Dropdown>
					{Object.keys(graphData).map((e, i) => {
						return (
							<Dropdown.Item key={'meteo_forecast_mode_' + i} onClick={() => setMode(e)}>
								{e}
							</Dropdown.Item>
						)
					})}
				</Dropdown>
			</div>
		</div>
	)
}

MeteoForecast.propTypes = {
	meteo: PropTypes.object,
	closeDate: PropTypes.object,
}
