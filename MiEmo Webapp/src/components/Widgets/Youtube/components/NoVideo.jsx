import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import noVideoAsset from '/public/img/novideo.svg'

const NoVideo = ({ size }) => {
	return (
		<DivContainer size={size}>
			<img className="w-25 h-auto" src={noVideoAsset} />
			<p>Aucune vidéo</p>
		</DivContainer>
	)
}

NoVideo.propTypes = {
	size: PropTypes.string.isRequired,
}

NoVideo.defaultProps = {
	size: '68%',
}

const DivContainer = styled.div`
	height: ${props => props.size};
	margin-bottom: 5px;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-content: center;
	align-items: center;
`

export default NoVideo
