import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function StoreItem({ componentInfos, mode, event }) {
	const _Img = componentInfos?.img
	return (
		<DivContainer
			className={'mx-1 ' + (mode == 'add' ? 'p-card' : '')}
			mode={mode}
			onClick={() => event.emit(mode == 'add' ? 'itemAdd' : 'itemDel', componentInfos?.id, false)}
		>
			<Img src={_Img} mode={mode} />
			<p className="text-truncate">{componentInfos.name}</p>
			<Icustom
				className={
					'pi py-1 px-1 d-block mt-2 ' +
					(mode == 'del' ? 'pi-minus-circle position-absolute right-0 top-0' : 'pi-plus-circle')
				}
				mode={mode}
			/>
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
//
const Icustom = styled.i`
	color: ${props => (props.mode == 'add' ? '#5EEAD4' : 'red')};
`

const Img = styled.img`
	width: 100%;
	height 69%;
`

export default StoreItem
