import React, { useRef, useState, useEffect } from 'react'

import AudioPlayerBase from 'react-audio-player'
import Slider from 'rc-slider'
import { Row } from 'react-bootstrap'
import { VirtualScroller } from 'primereact/virtualscroller'

import RadioListItem from './RadioListItem'
import SearchRadioModal from './SearchRadioModal'
import AccentedButton from '../../ui/AccentedButton'
import AccentedListGroupItem from '../../ui/AcccentedListGroupItem'

import { FaSearch, FaVolumeUp, FaStop, FaPlay } from 'react-icons/fa'
import { IoMdRadio, IoMdHeartDislike, IoIosHeart } from 'react-icons/io'

import { isEmpty } from 'lodash'
import { loadLocalStorageKeyAsJsonObject, bitFlags } from '../../../utils/utils'

import settings from '../../../settings/settings'

const ReactAudioPlayer = settings.isProd ? AudioPlayerBase.default : AudioPlayerBase

const radioPlayState = {
	shouldPlay: 1 << 0,
	isPlaying: 1 << 1,
	isErrored: 1 << 2,
	isPaused: 1 << 3,
}

function Radio() {
	const [modalSearchVisible, setModalSearchVisible] = useState(false)

	const audioRef = useRef(null)
	const [volume, setVolume] = useState(50)
	const [currentRadio, setCurrentRadio] = useState({})
	const [playState, setPlayState] = useState(0) //00000000b = nothing

	const [favorites, setFavorites] = useState(loadLocalStorageKeyAsJsonObject('com.miemo.radio.favorites', {}))

	useEffect(() => {
		localStorage.setItem('com.miemo.radio.favorites', JSON.stringify(favorites))
	}, [favorites])

	const playActions = {
		play: () =>
			setPlayState(
				bitFlags.setMultipleBitFlags(playState, [
					{ flag: radioPlayState.isPlaying, state: 1 },
					{ flag: radioPlayState.isPaused, state: 0 },
				]),
			),
		pause: () =>
			setPlayState(
				bitFlags.setMultipleBitFlags(playState, [
					{ flag: radioPlayState.isPlaying, state: 0 },
					{ flag: radioPlayState.isPaused, state: 1 },
				]),
			),
		error: () =>
			setPlayState(
				bitFlags.setMultipleBitFlags(playState, [
					{ flag: radioPlayState.isPlaying, state: 0 },
					{ flag: radioPlayState.isPaused, state: 0 },
					{ flag: radioPlayState.isErrored, state: 1 },
				]),
			),
		stop: () => setPlayState(0),
	}

	const template = (item, options) => {
		const radio = favorites[item]
		return (
			<AccentedListGroupItem
				action
				onClick={() => {
					setCurrentRadio(radio)
					setPlayState(radioPlayState.shouldPlay)
				}}
			>
				<RadioListItem
					radioInfos={{
						name: radio.name,
						stationUuid: radio.stationuuid,
						url: radio.url,
						favicon: radio.favicon,
						country: radio.country,
						countryCode: radio.countrycode,
					}}
					playState={playState}
					currentRadio={currentRadio.stationuuid}
					options={options}
				/>
			</AccentedListGroupItem>
		)
	}

	const generateActionsPanel = () => {
		return (
			<>
				{bitFlags.isOn(radioPlayState.isPlaying, playState) && (
					<AccentedButton onClick={() => audioRef?.current?.audioEl?.current?.pause()}>
						<FaStop />
					</AccentedButton>
				)}
				{bitFlags.isOn(radioPlayState.isPaused, playState) && (
					<AccentedButton onClick={() => audioRef?.current?.audioEl?.current?.play()}>
						<FaPlay />
					</AccentedButton>
				)}
				{radioPlayState.shouldPlay === playState && <AccentedButton loading />}
			</>
		)
	}

	return (
		<div className="h-100 d-flex flex-column">
			<SearchRadioModal
				isModalVisible={modalSearchVisible}
				setModalVisible={setModalSearchVisible}
				setCurrentRadio={radio => {
					setCurrentRadio(radio)
					setPlayState(radioPlayState.shouldPlay)
				}}
			/>
			<div className="d-flex justify-content-between align-items-baseline my-0 p-1 vertical-align-middle">
				<AccentedButton className="p-button-rounded p-1 px-2 d-inline-block">
					<FaVolumeUp />
				</AccentedButton>
				<AccentedButton
					className="p-button-rounded d-inline-block p-1 px-2 mx-1"
					onClick={() => setModalSearchVisible(true)}
				>
					<FaSearch />
				</AccentedButton>
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
						onPlay={playActions.play}
						onPause={playActions.pause}
						onStop={playActions.stop}
						volume={volume / 100}
						onError={playActions.error}
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
					</div>
					<div className="d-flex justify-content-between w-100 h-min-content">
						{generateActionsPanel()}
						{favorites[currentRadio.stationuuid] == null ? (
							<AccentedButton
								onClick={() => setFavorites({ [currentRadio.stationuuid]: currentRadio, ...favorites })}
							>
								<IoIosHeart />
							</AccentedButton>
						) : (
							<AccentedButton
								onClick={() =>
									setFavorites({ ...delete favorites[currentRadio.stationuuid], ...favorites })
								}
							>
								<IoMdHeartDislike />
							</AccentedButton>
						)}
					</div>
				</Row>
			)}
			<Row className="h-100">
				<div className="overflow-auto h-100">
					<VirtualScroller
						items={Object.keys(favorites)}
						itemSize={30}
						itemTemplate={template}
						className="h-100"
					/>
				</div>
			</Row>
		</div>
	)
}

export default Radio
export { radioPlayState }
