import React, { useRef, useState } from 'react'

import AudioPlayerBase from 'react-audio-player'
import Slider from 'rc-slider'
import { Button } from 'primereact/button'
import { ListGroupItem, Row } from 'react-bootstrap'
import { VirtualScroller } from 'primereact/virtualscroller'

import RadioListItem from './RadioListItem'
import SearchRadioModal from './SearchRadioModal'
import RadioStateItem from './RadioStateItem'

import { IoMdRadio } from 'react-icons/io'
import { FaSearch, FaVolumeUp, FaStop, FaPlay } from 'react-icons/fa'

import { isEmpty } from 'lodash'

import settings from '../../../settings/settings'

const ReactAudioPlayer = settings.isProd ? AudioPlayerBase.default : AudioPlayerBase

function Radio() {
	const [modalSearchVisible, setModalSearchVisible] = useState(false)

	const audioRef = useRef(null)
	const [volume, setVolume] = useState(50)
	const [currentRadio, setCurrentRadio] = useState({})
	const [playState, setPlayState] = useState('neutral')
	const [play, setPlay] = useState(true)

	const [radioList] = useState([])

	const template = (item, options) => (
		<ListGroupItem
			action
			onClick={() => {
				setCurrentRadio(item)
				setPlayState('loading')
			}}
		>
			<RadioListItem
				radioInfos={{
					name: item.name,
					stationUuid: item.stationuuid,
					url: item.url,
					favicon: item.favicon,
					country: item.country,
					countryCode: item.countrycode,
				}}
				playState="playing"
				currentRadio={currentRadio.stationuuid}
				options={options}
			/>
		</ListGroupItem>
	)

	return (
		<div className="h-100 d-flex flex-column">
			<SearchRadioModal
				isModalVisible={modalSearchVisible}
				setModalVisible={setModalSearchVisible}
				setCurrentRadio={radio => {
					setCurrentRadio(radio)
					setPlay(true)
				}}
			/>
			<div className="d-flex justify-content-between align-items-baseline my-0 p-1 vertical-align-middle">
				<Button className="p-button-rounded p-1 px-2 d-inline-block">
					<FaVolumeUp />
				</Button>
				<Button
					className="p-button-rounded d-inline-block p-1 px-2 mx-1"
					onClick={() => setModalSearchVisible(true)}
				>
					<FaSearch />
				</Button>
			</div>
			<div>
				<Slider value={volume} onChange={setVolume} />
			</div>
			{isEmpty(currentRadio) && <p>Aucune radio sélectionnée</p>}
			{!isEmpty(currentRadio) && (
				<Row className="h-100">
					<ReactAudioPlayer
						autoPlay
						ref={audioRef}
						src={currentRadio.url}
						onPlay={() => {
							setPlayState('playing')
							setPlay(true)
						}}
						onPause={() => {
							setPlayState('neutral')
							setPlay(false)
						}}
						onStop={() => {
							setPlay(false)
							setPlayState('neutral')
						}}
						volume={volume / 100}
						onError={() => {
							setPlayState('error')
							setPlay(false)
						}}
					/>
					<div>
						{currentRadio?.favicon == '' ? (
							<div className="px-auto w-min-content mx-auto">
								<IoMdRadio size="10em" />
							</div>
						) : (
							<img
								src={currentRadio?.favicon}
								className="d-block img-fluid img-thumbnail mx-auto"
								style={{ borderRadius: '50%', height: '10em', width: '10em', objectFit: 'contain' }}
							/>
						)}
						<p className="text-center">{currentRadio.name}</p>
						<RadioStateItem playState={playState} />
					</div>
					<div className="d-flex justify-content-between w-100 h-min-content">
						{play && playState != 'error' ? (
							<Button onClick={() => audioRef?.current?.audioEl?.current?.pause()}>
								<FaStop />
							</Button>
						) : (
							<Button onClick={() => audioRef?.current?.audioEl?.current?.play()}>
								<FaPlay />
							</Button>
						)}
					</div>
				</Row>
			)}
			<Row className="h-100 d-none">
				<div className="overflow-auto h-100">
					<VirtualScroller items={radioList} itemSize={30} itemTemplate={template} className="h-100" />
				</div>
			</Row>
		</div>
	)
}

export default Radio
