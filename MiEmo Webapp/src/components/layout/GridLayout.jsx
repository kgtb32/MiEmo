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
		<Grid
			className="layout "
			resizeHandles={['e', 'n', 'ne', 'nw', 's', 'se', 'sw', 'w']}
			layouts={layout.layouts}
			draggableCancel=".no-drag"
			breakpoints={layout.breakpoints}
			cols={layout.cols}
			width={size.width + ''}
		>
			{generateDom(layout.components)}
		</Grid>
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

export default withSize()(GridLayout)
