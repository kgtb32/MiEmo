import React from 'react'
import PropTypes from 'prop-types'

import HologramItem from './HologramItem'

import settings from '../../../settings/settings'

export default function CurrentHologram({ hologramSettings, availableHolograms, setHologramSettings, deleteHologram }) {
	return (
		<div className="d-flex justify-content-between w-100 flex-wrap">
			{availableHolograms.map(({ holo_uuid, holo_url }) => {
				return (
					<HologramItem
						key={holo_uuid}
						src={`${settings.endPoints.miemoGame}${holo_url}`}
						choosen={hologramSettings?.selectedHologram == holo_uuid}
						id={holo_uuid}
						displayDeleteButton={true}
						clickCallback={(id, type) => {
							if (type) {
								deleteHologram(id)
							} else {
								setHologramSettings({
									...hologramSettings,
									selectedHologram: id,
								})
							}
						}}
					/>
				)
			})}
		</div>
	)
}

CurrentHologram.propTypes = {
	hologramSettings: PropTypes.shape({
		selectedHologram: PropTypes.string,
		changeOnGameStart: PropTypes.bool,
	}),
	availableHolograms: PropTypes.array,
	setHologramSettings: PropTypes.func,
	deleteHologram: PropTypes.func,
}
