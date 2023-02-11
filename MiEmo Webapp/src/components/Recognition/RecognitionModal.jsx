import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import microphone from '/public/img/microphonedisabled.svg'
import { Image } from 'primereact/image'
import { command } from './command/command'
import useStoreContext from '../../context/StoreContext'

function RecognitionModal({ isClick, setIsClick }) {
	const { widgetEventManager } = useStoreContext()
	const [isError, setIsError] = useState(false)
	const getConf = recognition => {
		recognition.continuous = true
		recognition.onend = () => isClick && startSpeech(recognition)
		recognition.onresult = result => {
			const value = result.results[result.results.length - 1][0]?.transcript
			command(value, widgetEventManager, setIsClick)
			console.log(value)
		}
		return recognition
	}

	const recognition = useMemo(() => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
		let recognition = new SpeechRecognition()
		return getConf(recognition)
	}, [])

	useEffect(() => {
		isClick && GetSpeech()
		return isClick => {
			recognition.onend = () => null
			!isClick && recognition.abort()
		}
	}, [isError])

	const GetSpeech = () => {
		navigator.permissions.query({ name: 'microphone' }).then(function (permissionStatus) {
			permissionStatus.state == 'granted' ? startSpeech(recognition) : setIsError(true)
			permissionStatus.onchange = () => {
				if (permissionStatus.state == 'granted') {
					setIsError(false)
					recognition.onend = () => isClick && startSpeech(recognition)
				} else {
					!isError && setIsError(true)
					recognition.onend = () => null
					recognition.abort()
				}
			}
		})
	}

	const startSpeech = recognition => {
		try {
			recognition.start()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Modal
				size="md"
				show={isClick}
				onHide={() => setIsClick(false)}
				aria-labelledby="example-modal-sizes-title-md"
				centered
				className="no-drag"
			>
				<DivContainer iserror={isError.toString()}>
					<p>{!isError ? 'MIEmo vous écoutes' : 'Oops! veuillez activer votre micro'}</p>
					{!isError ? (
						<div className="loader">
							<span className="stroke"></span>
							<span className="stroke"></span>
							<span className="stroke"></span>
							<span className="stroke"></span>
							<span className="stroke"></span>
							<span className="stroke"></span>
							<span className="stroke"></span>
						</div>
					) : (
						<ErrorImage src={microphone}></ErrorImage>
					)}
				</DivContainer>
			</Modal>
		</>
	)
}

RecognitionModal.propTypes = {
	setIsClick: PropTypes.func.isRequired,
	isClick: PropTypes.bool.isRequired,
}

RecognitionModal.defaultProps = {
	setIsClick: () => '',
	isClick: () => false,
}

const ErrorImage = styled(Image)`
	width: 25%;
	${'img'} {
		width: 100%;
		border-radius: 10px;
	}
`

const DivContainer = styled(Modal.Body)`
	p {
		margin: 0;
		font-weight: 600;
	}

	display: flex;
	height: 142px;
	min-width: 10vh;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background: ${props => (props.iserror === 'false' ? 'linear-gradient(45deg, #0006ff, #5eead4)' : 'red')};
	border-radius: 1.5em !important;

	.loader {
		height: 70px;
		display: flex;
		align-items: center;
	}

	.loader .stroke {
		display: block;
		position: relative;
		background: #f1f1f1;
		height: 100%;
		width: 10px;
		border-radius: 50px;
		margin: 0 5px;
		animation: animate 1.2s linear infinite;
	}

	@keyframes animate {
		50% {
			height: 20%;
		}
		100% {
			height: 100%;
		}
	}

	.stroke:nth-child(1) {
		animation-delay: 0s;
	}

	.stroke:nth-child(2) {
		animation-delay: 0.3s;
	}

	.stroke:nth-child(3) {
		animation-delay: 0.6s;
	}

	.stroke:nth-child(4) {
		animation-delay: 0.9s;
	}

	.stroke:nth-child(5) {
		animation-delay: 0.6s;
	}

	.stroke:nth-child(6) {
		animation-delay: 0.3s;
	}

	.stroke:nth-child(7) {
		animation-delay: 0s;
	}
`

export default React.memo(RecognitionModal)
