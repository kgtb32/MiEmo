import React from 'react'
import PropTypes from 'prop-types'

import AccentedListGroupItem from '../ui/AcccentedListGroupItem'

import { PlatformProps } from '../../proptypes/PlatformPropTypes'

export default function PlatformList({ platforms, selectedPlatform, setSelectedPlatform }) {
	return (
		<div className="w-100">
			{platforms.map((platform, index) => {
				return (
					<AccentedListGroupItem
						key={`platform_list_${platform.platform_id}`}
						id={`scroll-${index}`}
						active={selectedPlatform == index}
						className={`p-3 my-1 rounded`}
						onClick={() => setSelectedPlatform(index)}
					>
						<img className="w-10" src={platform.game_box} />
						<span className="mx-1">{platform.name}</span>
					</AccentedListGroupItem>
				)
			})}
		</div>
	)
}

PlatformList.propTypes = {
	platforms: PropTypes.arrayOf(PropTypes.shape(PlatformProps)),
	selectedPlatform: PropTypes.number.isRequired,
	setSelectedPlatform: PropTypes.func.isRequired,
}

PlatformList.defaultProps = {
	platforms: [],
	selectedPlatform: 0,
	setSelectedPlatform: () => void 0,
}
