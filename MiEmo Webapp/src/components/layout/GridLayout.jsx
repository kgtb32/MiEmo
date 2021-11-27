import { React, useState } from 'react'

import { Responsive, WidthProvider } from 'react-grid-layout'

import 'react-grid-layout/css/styles.css'
import componentFactory from './ComponentFactory'

import { Card } from 'primereact/card'

import layoutFactory from '../../layouts/layoutFactory'

import 'primereact/resources/themes/lara-light-blue/theme.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

function GridLayout() {
	const [layout] = useState(layoutFactory.LD_0)

	const generateDom = components => {
		return components.map(element => {
			const Component = componentFactory[element.componentId]
			return (
				<div key={element.gridId} style={{ padding: '0.5em' }}>
					<Card title="Horloge" style={{ height: '100%' }}>
						<div className="no-drag">
							<Component />
						</div>
					</Card>
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

export default GridLayout
