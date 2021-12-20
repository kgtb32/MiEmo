import { React, useState } from 'react'

import styled from 'styled-components'

import { Responsive, WidthProvider } from 'react-grid-layout'

import { Card } from 'primereact/card'

import componentFactory from './ComponentFactory'
import layoutFactory from '../../layouts/layoutFactory'

import 'react-grid-layout/css/styles.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import '../../static/css/height.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

function GridLayout() {
	const [layout] = useState(layoutFactory.LD_0)

	const generateDom = components => {
		return components.map(element => {
			const Component = componentFactory[element.componentId]
			return (
				<div key={element.gridId} style={{ padding: '0.5em' }}>
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
		<ResponsiveGridLayout
			className="layout"
			measureBeforeMount={true}
			resizeHandles={['e', 'n', 'ne', 'nw', 's', 'se', 'sw', 'w']}
			layouts={layout.layouts}
			draggableCancel=".no-drag"
			breakpoints={layout.breakpoints}
			cols={layout.cols}
		>
			{generateDom(layout.components)}
		</ResponsiveGridLayout>
	)
}

const JoliCard = styled(Card)`
	& .p-card-body {
		height: 100%;
		padding: 0.75rem;
	}

	& .p-card-content {
		height: 100%;
		padding: 0em;
	}
`

export default GridLayout
