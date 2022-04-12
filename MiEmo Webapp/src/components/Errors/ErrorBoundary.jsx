import React from 'react'
import PropTypes from 'prop-types'
import ErrorExplaination from './ErrorExplaination'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false, error: '' }
	}

	componentDidCatch(error) {
		// Affiche une UI de repli
		this.setState({ hasError: true, error })
	}

	render() {
		if (this.state.hasError) {
			return <ErrorExplaination error={this.state.error + ''} />
		}
		return this.props.children
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node,
}

export default ErrorBoundary
