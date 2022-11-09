import React, { useState, useCallback, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { SpeedDial } from 'primereact/speeddial'
import { HiOutlineSearch, HiTrash } from 'react-icons/hi'
import YoutbeHeader from './YoutbeHeader'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import YoutubeVideoItem from './YoutubeVideoItem'
import styled from 'styled-components'
import { ScrollPanel } from 'primereact/scrollpanel'
import NoVideo from './NoVideo'
import PropTypes from 'prop-types'
import api from '../../../../api'
import { ProgressSpinner } from 'primereact/progressspinner'

function SearchYoutubeModal(props) {
	const [lgShow, setLgShow] = useState({ isShow: false, history: false, search: false, favorites: false })
	const [query, setQuery] = useState('')
	const [result, setResult] = useState([])
	const [isLoad, setIsLoad] = useState(false)

	useEffect(() => {
		lgShow.history && setResult(JSON.parse(localStorage.getItem('youtubehistory')) ?? [])
		return () => setResult([])
	}, [lgShow])

	const executeSearch = useCallback(() => {
		const fetchAPI = async () => api.youtube.search(query)
		setIsLoad(true)
		fetchAPI().then(res => {
			setResult(res.items)
			setIsLoad(false)
		})
	})

	const selectedVideo = useCallback(video => {
		props.setVideo(video)
		setLgShow(false)
		addVideoToHistory(video)
	}, [])

	const addVideoToHistory = video => {
		let youtubeHistory = JSON.parse(localStorage.getItem('youtubehistory')) ?? []
		youtubeHistory.length === 20 && youtubeHistory.splice(0, 1)
		if (!youtubeHistory.find(e => e.id === video.id)) {
			localStorage.setItem('youtubehistory', JSON.stringify([...youtubeHistory, video]))
		}
	}

	const clearVideoHistory = () => {
		localStorage.setItem('youtubehistory', JSON.stringify([]))
		setResult([])
	}

	const items = [
		{
			label: 'Historique',
			icon: 'pi pi-history',
			command: () => {
				setLgShow({ isShow: true, history: true, search: false, favorites: false })
			},
		},
		{
			label: 'Rechercher',
			icon: 'pi pi-search',
			command: () => {
				setLgShow({ isShow: true, history: false, search: true, favorites: false })
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
				show={lgShow.isShow}
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
									{lgShow.search && (
										<>
											<i className="pi pi-search" />
											<InputTextCustom
												value={query}
												onChange={e => setQuery(e.target.value)}
												onKeyUp={e => setQuery(e.target.value)}
												placeholder="Rechercher"
												className="w-100"
											/>
										</>
									)}
								</span>
								<ButtonCustom
									color="blue"
									className="mx-1"
									disabled={query.length < 3 && lgShow.search}
									onClick={() => (lgShow.search ? executeSearch() : clearVideoHistory())}
								>
									{lgShow.search ? <HiOutlineSearch size={16} /> : <HiTrash size={16} />}
								</ButtonCustom>
							</div>
						</div>
						{result.length != 0 ? (
							<ScrollPanelCustom className="custombar1">
								{result.map((value, index) => (
									<YoutubeVideoItem data={value} key={index} setVideo={selectedVideo} />
								))}
							</ScrollPanelCustom>
						) : isLoad ? (
							<DivProgressSpinner>
								<ProgressSpinner />
							</DivProgressSpinner>
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
const DivProgressSpinner = styled.div`
	height: 65vh;
	margin-bottom: 5px;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-content: center;
	align-items: center;
`

export default React.memo(SearchYoutubeModal)
