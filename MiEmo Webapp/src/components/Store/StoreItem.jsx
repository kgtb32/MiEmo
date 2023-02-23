import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

function StoreItem({ componentInfos, mode, event }) {
	const _Img = componentInfos?.img

	const addComponent = id => {
		if (mode == 'add') {
			event.emit('itemAdd', id)
		}
	}

	return (
		<DivContainer
			className={'mx-1 ' + (mode == 'add' ? 'p-card' : '')}
			mode={mode}
			onClick={() => addComponent(componentInfos?.id)}
		>
			<Img src={_Img} mode={mode} />
			<p className="text-truncate">{componentInfos.name}</p>
			<div
				className={'pi py-1 px-1 d-block mt-2 ' + (mode == 'del' ? 'position-absolute right-0 top-0' : '')}
				mode={mode}
			>
				{mode == 'del' ? (
					<AiOutlineMinusCircle
						color="red"
						size="2em"
						onClick={() => event.emit('itemDel', componentInfos?.id ?? 0)}
					/>
				) : (
					<AiOutlinePlusCircle
						color="green"
						size="2em"
						onClick={() => event.emit('itemAdd', componentInfos?.id ?? 0)}
					/>
				)}
			</div>
		</DivContainer>
	)
}

StoreItem.propTypes = {
	componentInfos: PropTypes.shape({
		item: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		img: PropTypes.any.isRequired,
		minW: PropTypes.number,
		minH: PropTypes.number,
		id: PropTypes.string.isRequired,
	}),
	mode: PropTypes.oneOf(['add', 'del']),
	event: PropTypes.object.isRequired,
}

StoreItem.defaultProps = {
	componentInfos: {
		item: () => <></>,
		name: 'item not present in store',
		img: () => <></>,
		minW: 1,
		minH: 1,
	},
	mode: 'add',
}

const DivContainer = styled.div`
	font-weight: bold;
	color: white;
	display: flex;
	flex-direction: column;
	text-overflow: ellipsis;
	overflow: hidden;
	text-align: center;
	align-items: center;
	justify-content: center;
	${'p'} {
		margin: ${props => (props.mode == 'add' ? '0' : '')};
		width: 100%;
	}
	min-width: ${props => (props.mode == 'add' ? '170px' : '')};
	min-height: ${props => (props.mode == 'add' ? '156px' : '')};
	width: ${props => props.mode == 'del' && '100%'};
	height: ${props => props.mode == 'del' && '100%'};
`

const Img = styled.img`
	width: 100%;
	height 69%;
`

export default StoreItem
