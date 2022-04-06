import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { EventEmitter } from 'events'

export const StoreContext = createContext()

export const StoreProvider = props => {
	const [widgetEditMode, setWidgetEditMode] = useState(false)
	const [widgetEventManager] = useState(new EventEmitter())

	const toggleWidgetEditMode = () => {
		setWidgetEditMode(!widgetEditMode)
	}

	return (
		<StoreContext.Provider
			value={{
				widgetEditMode,
				toggleWidgetEditMode,
				widgetEventManager,
			}}
		>
			{props.children}
		</StoreContext.Provider>
	)
}

StoreProvider.propTypes = {
	children: PropTypes.any,
}

const useStoreContext = () => {
	return useContext(StoreContext)
}

export default useStoreContext
