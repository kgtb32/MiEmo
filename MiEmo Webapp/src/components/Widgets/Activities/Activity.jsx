import React, { useState } from 'react'

import ActivitySelectorModal from './ActivitySelectorModal'

import { Button } from 'primereact/button'

function Activity() {
	const [activitySelectorModalVisible, setActivitySelectorModalVisible] = useState(false)

	return (
		<div>
			<ActivitySelectorModal
				modalVisible={activitySelectorModalVisible}
				setModalVisible={setActivitySelectorModalVisible}
			/>
			<Button onClick={() => setActivitySelectorModalVisible(true)}>Démarrer une activité</Button>
		</div>
	)
}

export default Activity
