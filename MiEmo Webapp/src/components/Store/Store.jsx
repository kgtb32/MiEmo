import React from 'react'

import StoreItem from './StoreItem'

import useStoreContext from '../../context/StoreContext'
import ComponentFactory from '../layout/ComponentFactory'
import styled from 'styled-components'

function Store() {
	const { widgetEventManager } = useStoreContext()

	return (
		<>
			<DivContainer>
				{Object.keys(ComponentFactory).map(id => {
					return (
						<StoreItem
							key={'stroke_' + id}
							componentInfos={{ ...ComponentFactory[id], id }}
							mode="add"
							event={widgetEventManager}
						/>
					)
				})}
			</DivContainer>
		</>
	)
}

const DivContainer = styled.div`
	width: 100%;
	display: flex;
	overflow-x: scroll;
	padding: 10px;
	::-webkit-scrollbar {
		height: 4px;
		background: #969696;
		-webkit-border-radius: 1ex;
	}

	::-webkit-scrollbar-thumb {
		height: 9px;
		width: 350px;
		background: #5eead4;
		border-radius: 10px;
		-webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
	}

	::-webkit-scrollbar-corner {
		background: #1a1a1a;
	}
`

export default Store
