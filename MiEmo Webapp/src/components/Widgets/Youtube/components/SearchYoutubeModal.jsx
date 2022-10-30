import React, { useState, useCallback } from 'react'
import Modal from 'react-bootstrap/Modal'
import { SpeedDial } from 'primereact/speeddial'
import { HiOutlineSearch } from 'react-icons/hi'
import YoutbeHeader from './YoutbeHeader'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import YoutubeVideoItem from './YoutubeVideoItem'
import styled from 'styled-components'
import { ScrollPanel } from 'primereact/scrollpanel'
import NoVideo from './NoVideo'
import PropTypes from 'prop-types'
import api from '../../../../api'

function SearchYoutubeModal(props) {
	const [lgShow, setLgShow] = useState(false)
	const [query, setQuery] = useState('')
	const [result, setResult] = useState([])

	const executeSearch = useCallback(() => {
		const fetchAPI = async () => {
			return api.youtube.search(query)
		}
		fetchAPI().then(res => setResult(res))
	})

	const selectedVideo = video => {
		props.setVideo(video)
		setLgShow(false)
		addVideoToHistory(video)
	}

	const addVideoToHistory = video => {
		let youtubeHistory = JSON.parse(localStorage.getItem('youtubehistory')) ?? []
		if (!youtubeHistory.find(e => e.id.videoId === video.id.videoId)) {
			localStorage.setItem('youtubehistory', JSON.stringify([...youtubeHistory, video]))
		}
	}

	const items = [
		{
			label: 'Historique',
			icon: 'pi pi-history',
			command: () => {
				// To-do
			},
		},
		{
			label: 'Rechercher',
			icon: 'pi pi-search',
			command: () => {
				setLgShow(true)
			},
		},
		{
			label: 'Favorie',
			icon: 'pi pi-heart',
			command: () => {
				// To-do
			},
		},
	]

	return (
		<>
			{/* <HiOutlineSearch size={16} onClick={() => setLgShow(true)} color={'white'} /> */}
			<SpeedDialCutom
				model={items}
				radius={90}
				direction="down-left"
				type="quarter-circle"
				showIcon="pi pi-bars"
				hideIcon="pi pi-times"
				buttonClassName="p-button-outlined"
			/>
			<Modal
				size="lg"
				show={lgShow}
				onHide={() => setLgShow(false)}
				aria-labelledby="example-modal-sizes-title-lg"
				centered
				className="no-drag"
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						<YoutbeHeader />
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<div className="w-100 p-3 pt-0">
							<div className="d-flex">
								<span className="p-input-icon-left w-100">
									<i className="pi pi-search" />
									<InputTextCustom
										value={query}
										onChange={e => setQuery(e.target.value)}
										onKeyUp={e => setQuery(e.target.value)}
										placeholder="Rechercher"
										className="w-100"
									/>
								</span>
								<ButtonCustom
									color="blue"
									className="mx-1"
									disabled={query.length < 3}
									onClick={() => executeSearch()}
								>
									<HiOutlineSearch size={16} />
								</ButtonCustom>
							</div>
						</div>
						{result.length != 0 ? (
							<ScrollPanelCustom className="custombar1">
								{result.map((value, index) => (
									<YoutubeVideoItem data={value} key={index} setVideo={selectedVideo} />
								))}
							</ScrollPanelCustom>
						) : (
							<NoVideo size={'65vh'} />
						)}
					</div>
				</Modal.Body>
			</Modal>
		</>
	)
}

SearchYoutubeModal.propTypes = {
	setVideo: PropTypes.func.isRequired,
}

SearchYoutubeModal.defaultProps = {
	setVideo: () => '',
}

const InputTextCustom = styled(InputText)`
	&:enabled:hover {
		border-color: red;
	}
	&:enabled:focus {
		box-shadow: 0 0 0 0.2rem red;
		border: none;
	}
`
const ButtonCustom = styled(Button)`
	background-color: red;
	color: white;
	border: none;
	margin-left: 10px !important;
	&:enabled:hover {
		background-color: white;
		color: red;
	}
	&:enabled:active,
	&:enabled:focus {
		background-color: red;
		color: white;
		box-shadow: 0 0 0 2px #1c2127, 0 0 0 4px rgb(255 0 0 / 70%), 0 1px 2px 0 rgb(0 0 0 / 0%) !important;
	}
`

const ScrollPanelCustom = styled(ScrollPanel)`
	width: 100%;
	max-height: 65vh;
	${'.p-scrollpanel-content'} {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-content: flex-start;
		justify-content: flex-start;
	}
	${'.p-scrollpanel-bar'} {
		background: red;
	}
`

const SpeedDialCutom = styled(SpeedDial)`
	position: static;
	${'.p-speeddial-button.p-button.p-button-icon-only'} {
		width: 30px;
		height: 30px;
		z-index: 10;
	}

	${'.p-button.p-button-outlined'} {
		color: red;
	}

	${'.p-button.p-button-outlined'}:enabled:hover {
		color: red;
	}

	${'.p-button'}:enabled:active {
		color: red;
	}

	${'.p-button'}:enabled:focus {
		box-shadow: 0 0 0 2px #1c2127, 0 0 0 4px red, 0 1px 2px 0 rgb(0 0 0 / 0%);
	}

	${'.p-speeddial-item'} {
		z-index: 10;
	}

	${'.p-speeddial-action'} {
		background-color: white;
		color: red;
	}
`

export default React.memo(SearchYoutubeModal)
