import React, { useState } from 'react'

import ActivitySelectorModal from './ActivitySelectorModal'
import AccentedButton from '../../ui/AccentedButton'

function Activity() {
	const [activitySelectorModalVisible, setActivitySelectorModalVisible] = useState(false)

	return (
		<div>
			<ActivitySelectorModal
				modalVisible={activitySelectorModalVisible}
				setModalVisible={setActivitySelectorModalVisible}
			/>
			<AccentedButton onClick={() => setActivitySelectorModalVisible(true)}>Démarrer une activité</AccentedButton>
		</div>
	)
}

export default Activity
