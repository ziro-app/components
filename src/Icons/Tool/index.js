import React from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const Tool = ({ style, onClick, size, color, strokeWidth }) =>	
	<Scaffold
		svgPath={
			<>
				{/* <rect x='3' y='11' width='18' height='11' rx='2' ry='2'></rect> */}
				<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
			</>
		}
		style={style}
		onClick={onClick}
		size={size}
		color={color}
		strokeWidth={strokeWidth}
	/>

Tool.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}