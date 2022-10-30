import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { HiOutlineSearch } from 'react-icons/hi'
import YoutbeHeader from './YoutbeHeader'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import YoutubeVideoItem from './YoutubeVideoItem'
import styled from 'styled-components'
import { ScrollPanel } from 'primereact/scrollpanel'
import mock from '../../../../api/mock/youtube/youtube.json'

function SearchYoutubeModal() {
	const [lgShow, setLgShow] = useState(false)
	const [query, setQuery] = useState('')

	return (
		<>
			<HiOutlineSearch size={16} onClick={() => setLgShow(true)} color={'white'} />
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
								<ButtonCustom className="mx-1" disabled={query.length < 3}>
									<HiOutlineSearch size={16} />
								</ButtonCustom>
							</div>
						</div>
						<ScrollPanelCustom className="custombar1">
							{mock.map((value, index) => (
								<YoutubeVideoItem data={value} key={index} />
							))}
						</ScrollPanelCustom>
					</div>
				</Modal.Body>
			</Modal>
		</>
	)
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

export default SearchYoutubeModal
