import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'primereact/button'

import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io'

function StoreItem({ componentInfos, mode, event }) {
	console.log(mode)
	const Img = componentInfos?.img
	return (
		<div
			className={'d-flex flex-column text-center user-select-none mx-1 h-100 ' + (mode == 'add' ? 'p-card' : '')}
		>
			<div>
				<Img size="4em" />
				<div className="text-truncate">
					<small>{componentInfos.name}</small>
				</div>
			</div>
			<Button
				onClick={() => event.emit(mode == 'add' ? 'itemAdd' : 'itemDel', componentInfos?.id)}
				className={
					'p-button-rounded py-1 px-1 d-block mx-auto mt-2 ' +
					(mode == 'del' ? 'p-button-danger position-absolute right-0' : '')
				}
			>
				{mode == 'del' ? <IoMdRemoveCircle size="1.5em" /> : <IoMdAddCircle size="1.5em" />}
			</Button>
		</div>
	)
}

StoreItem.propTypes = {
	componentInfos: PropTypes.shape({
		item: PropTypes.func.isRequired,
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

export default StoreItem
