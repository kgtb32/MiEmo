import React, { useCallback, useEffect, useRef, useState } from 'react'

import { ListGroup } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider'

import SettingsHeader from '../../components/Settings/SettingsHeader'
import AccentedListGroupItem from '../../components/ui/AcccentedListGroupItem'
import AccentedSwitch from '../../components/ui/AccentedSwitch'

import AudioPlayerBase from 'react-audio-player'

import { BsSpeakerFill } from 'react-icons/bs'

import BeepSound from '/sounds/beep.ogg'

import api from '../../api/'

import settings from '../../settings/settings'

const ReactAudioPlayer = settings.isProd ? AudioPlayerBase.default : AudioPlayerBase

function AudioMixer() {
	const [surAmp, setSurAmp] = useState(false)
	const [volume, setVolume] = useState(50)

	const [sinks, setSinks] = useState([])
	const [audioInfo, setAudioInfo] = useState({})

	const audioRef = useRef(null)

	const fetchBaseAPI = useCallback(needVolume => {
		const fetch = async () => {
			return Promise.all([api.audio.info(), api.audio.sinks.default()])
		}

		fetch()
			.then(res => {
				setAudioInfo(res[0])
				setSinks(res[1])
				if (needVolume) {
					const newVolume = convertAudioFieldToAudio(res[1], res[0]?.['default-sink'])
					setVolume(newVolume ?? volume)
					if (newVolume > 100) {
						setSurAmp(true)
					}
				}
			})
			.catch(() => void 0)
	})

	const updateVolume = (sink, currentVolume) => {
		const fetchUpdateAudio = async () => api.audio.sinks.setVolume(sink, currentVolume)
		fetchUpdateAudio()
			.then(() => audioRef?.current?.audioEl?.current?.play())
			.catch(() => void 0)
	}

	const setDefaultSink = sink => {
		const fetch = async () => api.audio.sinks.setDefaultSink(sink)
		fetch().catch(() => void 0)
	}

	const convertAudioFieldToAudio = (currentSinks, defaultSink) => {
		return currentSinks
			.map(e => {
				return { volume: e?.volume, name: e?.name }
			})
			.filter(e => e?.name == defaultSink)[0]
			?.volume?.split('/')[1]
			.replace('%', '')
	}

	useEffect(() => {
		fetchBaseAPI(true)
		const interval = setInterval(() => fetchBaseAPI(false), 10000)
		return () => {
			clearInterval(interval)
		}
	}, [])

	useEffect(() => {
		if (!surAmp && volume > 100) {
			setVolume(100)
		}
	}, [surAmp, volume])

	useEffect(() => {
		if (surAmp) {
			setVolume(convertAudioFieldToAudio(sinks, audioInfo?.['default-sink']) ?? volume)
		}
	}, [surAmp])

	return (
		<div className="p-4">
			<div>
				<ReactAudioPlayer ref={audioRef} src={BeepSound} volume={1} />
				<SettingsHeader headerTitle="Mélangeur Audio" backUrl="/settings" />
			</div>
			<div>
				<h2>Volume</h2>
				<div className="my-3">
					<div>
						<AccentedSwitch checked={surAmp} onChange={e => setSurAmp(e.target.value)} />
						<p className="d-inline-block mx-2 font-bold align-middle">sur-amplification</p>
					</div>
					<>
						<p>Volume global de MiEMo {`${volume}%`}</p>
						<RangeSlider
							value={parseInt(volume)}
							max={surAmp ? 150 : 100}
							variant="info"
							color="red"
							onChange={(_, value) => setVolume(value)}
							onAfterChange={() => updateVolume(audioInfo?.['default-sink'] ?? '', volume)}
						/>
					</>
				</div>
				<h2>Sorties audio</h2>
				<div className="my-3">
					<ListGroup>
						{sinks.map((e, i) => {
							return (
								<AccentedListGroupItem
									key={'sink_' + i}
									action
									active={e?.name == audioInfo?.['default-sink']}
									onClick={() => setDefaultSink(e?.name)}
								>
									<BsSpeakerFill size="2em" />
									<span className="mx-2">{e?.description}</span>
								</AccentedListGroupItem>
							)
						})}
					</ListGroup>
				</div>
			</div>
		</div>
	)
}

export default AudioMixer
