import settings from '../settings/settings'

import mock from './mock/'
import real from './real/'

const api = () => {
	return settings.useMock ? mock : real
}

const apis = {
	weather: {
		get: (latitude, longitude, enabledValues) => {
			return api().weather.get(latitude, longitude, enabledValues)
		},
	},
}

export default apis