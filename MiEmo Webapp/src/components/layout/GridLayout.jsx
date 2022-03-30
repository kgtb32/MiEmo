import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withSize } from 'react-sizeme'

import styled from 'styled-components'

import { Responsive as Grid } from 'react-grid-layout'

import { Card } from 'primereact/card'

import componentFactory from './ComponentFactory'
import layoutFactory from '../../layouts/layoutFactory'

import 'react-grid-layout/css/styles.css'
import 'primereact/resources/themes/lara-dark-teal/theme.css'

function GridLayout({ size }) {
	const [layout] = useState(layoutFactory.LD_0)

	const generateDom = components => {
		return components.map(element => {
			const Component = componentFactory[element.componentId]
			return (
				<div key={element.gridId} style={{ padding: '1.5em' }}>
					<JoliCard className="h-100">
						<div className="no-drag h-100">
							<Component />
						</div>
					</JoliCard>
				</div>
			)
		})
	}

	return (
		<JoliGrid
			className="layout "
			resizeHandles={['se']}
			layouts={layout.layouts}
			draggableCancel=".no-drag"
			breakpoints={layout.breakpoints}
			cols={layout.cols}
			width={size.width + ''}
		>
			{generateDom(layout.components)}
		</JoliGrid>
	)
}

GridLayout.propTypes = {
	size: PropTypes.shape({
		width: PropTypes.number,
	}),
}

const JoliCard = styled(Card)`
	& .p-card-body {
		height: 100%;
		padding: 0.5rem;
	}

	& .p-card-content {
		height: 100%;
		padding: 0em;
		border: 4px white;
	}
`

const JoliGrid = styled(Grid)`
	& .react-resizable-handle.react-resizable-handle::after {
		width: 15px;
		height: 15px;
		color: white;
		border-bottom: 2px solid white;
		border-right: 2px solid white;
	}
`
export default withSize()(GridLayout)
