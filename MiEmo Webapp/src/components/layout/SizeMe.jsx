import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export default function SizeMe({ children, sizeChanged }) {
	const parentRef = useRef(null)

	useEffect(() => {
		const [width, height] = [parentRef?.current?.clientWidth, parentRef?.current?.clientHeight]
		sizeChanged({ width, height })
	}, [parentRef?.current?.clientHeight, parentRef?.current?.clientWidth])

	return (
		<div className="w-100 h-100" ref={parentRef}>
			{children}
		</div>
	)
}

SizeMe.propTypes = {
	children: PropTypes.node.isRequired,
	sizeChanged: PropTypes.func,
}

SizeMe.defaultProps = {
	sizeChanged: () => void 0,
}
