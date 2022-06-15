import React from 'react'
import PropTypes from 'prop-types'

import { ListGroup } from 'react-bootstrap'

import { BiWifi0, BiWifi1, BiWifi2, BiWifi } from 'react-icons/bi'
import { FaLock, FaUnlock } from 'react-icons/fa'

const wifiLevel = [BiWifi0, BiWifi1, BiWifi2, BiWifi]

function WifiItem({ networkInfos: { ssid, security, inUse, signal } }) {
	const Level = wifiLevel[(((signal - 1) * 4) / 100) | 0]
	return (
		<ListGroup.Item action active={inUse == '*'}>
			<div className="d-flex justify-content-between">
				<div className="d-flex ">
					<Level size="3em" />
					<div className="mx-2 my-auto">
						<span>{`${ssid}`}</span>
					</div>
				</div>
				{security == '--' ? (
					<FaUnlock size="2em" className="my-auto" />
				) : (
					<FaLock size="2em" className="my-auto" />
				)}
			</div>
		</ListGroup.Item>
	)
}

WifiItem.propTypes = {
	networkInfos: PropTypes.shape({
		ssid: PropTypes.string,
		security: PropTypes.string,
		inUse: PropTypes.string,
		signal: PropTypes.number,
	}),
}

WifiItem.defaultProps = {
	networkInfos: {
		ssid: '',
		security: '',
		inUse: '',
		signal: 0,
	},
}

export default WifiItem
