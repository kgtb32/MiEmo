import { React, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import useStoreContext from '../../context/StoreContext'

import { nanoid } from 'nanoid'

import styled from 'styled-components'

import { Responsive as Grid } from 'react-grid-layout'

import { Card } from 'primereact/card'

import StoreItem from '../Store/StoreItem'
import SizeMe from './SizeMe'

import componentFactory from './ComponentFactory'
import layoutFactory from '../../layouts/layoutFactory'

import { loadLocalStorageKeyAsJsonObject } from '../../utils/utils'

import 'react-grid-layout/css/styles.css'
import 'primereact/resources/themes/lara-dark-teal/theme.css'

function GridLayout() {
	const [layout, setLayout] = useState(loadLocalStorageKeyAsJsonObject('layout', layoutFactory.LD_0))
	const [width, setWidth] = useState(0)

	const { widgetEventManager, widgetEditMode, showAlert, showInfo } = useStoreContext()

	const delItemFromLayout = useCallback(itemId => {
		setLayout({
			...layout,
			components: [
				...layout.components.filter(item => {
					return item.gridId != itemId
				}),
			],
			layouts: {
				lg: [
					...layout.layouts.lg.filter(item => {
						return item.i != itemId
					}),
				],
			},
		})
	})

	const addItemToLayout = useCallback(
		(componentId, itemId) => {
			setLayout({
				...layout,
				components: [
					...layout.components,
					{
						componentId: componentId,
						gridId: itemId,
					},
				],
				layouts: {
					lg: [
						...layout.layouts.lg,
						{
							i: itemId,
							x: 0,
							y: 0,
							w: componentFactory[componentId].minW,
							h: componentFactory[componentId].minH,
							minW: componentFactory[componentId].minW,
							minH: componentFactory[componentId].minH,
						},
					],
				},
			})
		},
		[layout],
	)

	useEffect(() => {
		widgetEventManager.on('itemAdd', componentId => {
			if (!layout.components.find(e => e.componentId === componentId)) {
				addItemToLayout(componentId, nanoid(1024))
				showInfo('Votre Wideget ' + componentId + ' est ajouté')
				widgetEventManager.removeAllListeners('itemAdd')
				widgetEventManager.removeAllListeners('itemDel')
			} else {
				showAlert('le widget ' + componentId + ' est déjà présent')
			}
		})
		widgetEventManager.on('itemDel', itemId => {
			if (layout.components.find(e => e.gridId === itemId)) {
				delItemFromLayout(itemId)
				showInfo('Votre Wideget est supprimé')
				widgetEventManager.removeAllListeners('itemAdd')
				widgetEventManager.removeAllListeners('itemDel')
			} else {
				showAlert('Impossible de supprimer le widget')
			}
		})
	}, [widgetEventManager, layout])

	useEffect(() => {
		localStorage.setItem('layout', JSON.stringify(layout))
	}, [layout])

	const generateDom = components => {
		return components.map(element => {
			const Component = componentFactory[element.componentId]?.item
			return (
				<div
					key={element.gridId}
					style={{ padding: '1.5em' }}
					className={widgetEditMode ? 'border rounded' : ''}
				>
					{widgetEditMode ? (
						<StoreItem
							componentInfos={{ ...componentFactory[element.componentId], id: element.gridId }}
							mode="del"
							event={widgetEventManager}
						/>
					) : (
						<JoliCard className="h-100">
							<div className="no-drag h-100">
								<Component layoutProps={{ gridId: element.gridId }} />
							</div>
						</JoliCard>
					)}
				</div>
			)
		})
	}

	const updateLayout = currentLayout => {
		setLayout({
			...layout,
			layouts: {
				lg: currentLayout,
			},
		})
	}

	return (
		<SizeMe sizeChanged={({ width }) => setWidth(width)}>
			<JoliGrid
				className="layout"
				resizeHandles={['se']}
				style={{
					minHeight: '120px',
				}}
				measureBeforeMount={true}
				layouts={layout.layouts}
				draggableCancel=".no-drag"
				breakpoints={layout.breakpoints}
				compactType={null}
				cols={layout.cols}
				width={width}
				onDragStop={updateLayout}
				onResizeStop={updateLayout}
				isDroppable={true}
			>
				{generateDom(layout.components)}
			</JoliGrid>
		</SizeMe>
	)
}

GridLayout.propTypes = {
	size: PropTypes.shape({
		width: PropTypes.number,
	}),
}

const JoliCard = styled(Card)`
	& .p-card-body {
		user-select: none;
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
export default GridLayout
