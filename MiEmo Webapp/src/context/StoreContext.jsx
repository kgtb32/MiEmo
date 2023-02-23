import React, { createContext, useState, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { Toast } from 'primereact/toast'

import { EventEmitter } from 'events'

export const StoreContext = createContext()

export const StoreProvider = props => {
	const [widgetEditMode, setWidgetEditMode] = useState(false)
	const [widgetEventManager] = useState(new EventEmitter())
	const toast = useRef(null)
	const showInfo = message => {
		toast.current.show({ severity: 'info', summary: 'MIEmo', detail: message, life: 1000 })
	}
	const showAlert = message => {
		toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 1000 })
	}

	const toggleWidgetEditMode = () => {
		setWidgetEditMode(!widgetEditMode)
	}

	return (
		<StoreContext.Provider
			value={{
				widgetEditMode,
				toggleWidgetEditMode,
				widgetEventManager,
				showInfo,
				showAlert,
			}}
		>
			<Toast ref={toast} />
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
