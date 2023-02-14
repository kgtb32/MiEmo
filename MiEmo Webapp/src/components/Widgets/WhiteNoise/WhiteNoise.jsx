import React, { useRef, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Button } from 'primereact/button'

import ReactHowler from 'react-howler'

import { bitFlags } from '../../../utils/utils'

import { FaMusic, FaStop } from 'react-icons/fa'

import whitenoisesList from './whitenoisesList'

const playState = {
	shouldPlay: 1 << 0,
	isPlaying: 1 << 1,
	isErrored: 1 << 2,
}

function WhiteNoise() {
	const [currentPlayState, setCurrentPlayState] = useState(0)
	const [currentNoise, setCurrentNoise] = useState()

	const whiteNoises = whitenoisesList

	const audioRef = useRef(null)

	const playActions = {
		play: () =>
			setCurrentPlayState(
				bitFlags.setMultipleBitFlags(currentPlayState, [
					{ flag: playState.isPlaying, state: 1 },
					{ flag: playState.isErrored, state: 0 },
				]),
			),
		error: () =>
			setCurrentPlayState(
				bitFlags.setMultipleBitFlags(currentPlayState, [
					{ flag: playState.isPlaying, state: 0 },
					{ flag: playState.isErrored, state: 1 },
					{ flag: playState.shouldPlay, state: 0 },
				]),
			),
		stop: () => setCurrentPlayState(0),
	}

	const whiteNoiseItem = ({ icon, src }, i) => (
		<ListGroup.Item
			key={'whiteNoise_' + i}
			action
			active={currentNoise?.pos == i}
			onClick={() => {
				if (i != currentNoise?.pos) {
					setCurrentNoise({
						pos: i,
						url: src,
					})
					setCurrentPlayState(playState.shouldPlay)
				}
			}}
			className="d-flex w-min-content rounded"
		>
			{!!icon && icon != '' ? (
				<img src={icon} width="50" height="50" className="my-auto mx-2 rounded-circle" />
			) : (
				<FaMusic className="mx-2 my-auto" style={{ height: '50', width: '50' }} />
			)}
		</ListGroup.Item>
	)

	return (
		<div className="d-flex flex-column h-100">
			<div className="overflow-auto d-flex flex-wrap justify-content-between row-gap beauty-scroll p-1">
				{whiteNoises.map((e, i) => whiteNoiseItem(e, i))}
			</div>
			{whiteNoises?.length == 0 && <p>Aucun son blanc n&apos;a pu être trouvé.</p>}
			{currentNoise?.url && (
				<ReactHowler
					autoPlay
					loop={true}
					ref={audioRef}
					src={currentNoise?.url ?? ''}
					onPlay={playActions.play}
					onPause={playActions.pause}
					onStop={playActions.stop}
					volume={0.5}
					onError={playActions.error}
				/>
			)}
			<div className="w-100 d-flex justify-content-center my-4">
				{bitFlags.isOn(playState.shouldPlay, currentPlayState) && (
					<>
						{bitFlags.isOn(playState.isPlaying, currentPlayState) ? (
							<Button
								onClick={() => {
									setCurrentNoise()
									setCurrentPlayState(0)
								}}
							>
								<FaStop />
							</Button>
						) : (
							<Button disabled loading />
						)}
					</>
				)}
				{bitFlags.isOn(playState.isErrored, currentPlayState) && !!currentNoise && (
					<p>Le son blanc n&apos;a pas pu être lu.</p>
				)}
			</div>
		</div>
	)
}

export default WhiteNoise
