import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Col, Row, ListGroup } from 'react-bootstrap'
import { GiNightSleep, GiMonkFace } from 'react-icons/gi'
import { MdDraw, MdRadio } from 'react-icons/md'
import { FaLightbulb } from 'react-icons/fa'

function ActivitySelectorModal({ modalVisible, setModalVisible, setActivity }) {
	const activities = [
		[
			{
				icon: GiNightSleep,
				text: 'Sons blancs',
				activityId: 'white-sounds',
			},
			{
				icon: MdDraw,
				text: 'Dessin',
				activityId: 'draw',
			},
		],
		[
			{
				icon: FaLightbulb,
				text: 'Conseils',
				activityId: 'advices',
			},
			{
				icon: GiMonkFace,
				text: 'Relaxation',
				activityId: 'relax',
			},
		],
		[
			{
				icon: MdRadio,
				text: 'Radio',
				activityId: 'radio',
			},
			{},
		],
	]

	return (
		<Modal show={modalVisible} onHide={() => setModalVisible(false)} className="no-drag">
			<Modal.Header closeButton>
				<Modal.Title>
					<h2>Sélectionner une activité</h2>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ListGroup>
					<div>
						<p className="text-center">Activités disponibles</p>
						{activities.map((row, rowIndex) => {
							return (
								<Row key={'activity_row_' + rowIndex}>
									{row.map((col, colIndex) => {
										const Icon = col?.icon
										return (
											<Col key={'activity_col_' + colIndex}>
												{col?.icon && col?.text && col?.activityId && (
													<ListGroup.Item
														action
														className="rounded my-1"
														onClick={() => setActivity(col?.activityId ?? '')}
													>
														<Icon />
														<small className="mx-1">{col?.text ?? 'texte absent'}</small>
													</ListGroup.Item>
												)}
											</Col>
										)
									})}
								</Row>
							)
						})}
					</div>
				</ListGroup>
			</Modal.Body>
		</Modal>
	)
}

ActivitySelectorModal.propTypes = {
	modalVisible: PropTypes.bool.isRequired,
	setModalVisible: PropTypes.func.isRequired,
	setActivity: PropTypes.func,
}

ActivitySelectorModal.defaultProps = {
	setActivity: () => void 0,
}

export default ActivitySelectorModal
