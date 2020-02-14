import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { shooterBtn, toggleBtn } from './styles'
import { VideoOff } from '../../Icons/VideoOff'
import { VideoOn } from '../../Icons/VideoOn'
import { VideoUser } from '../../Icons/VideoUser'
import { Close } from '../../Icons/Close'

const CameraButton = ({ type, click, toggle, size=50 }) => {
	const buttonTypes = {
		shooter:
			<motion.a
				onClick={click}
				style={shooterBtn(size).border}
				whileTap={{ scale: 0.95 }}
			>
				<div style={shooterBtn(size).middle}/>
			</motion.a>,
		video:
			<motion.a
				onClick={click}
				style={toggleBtn(size)}
				whileTap={{ scale: 0.95 }}
			>
				{
					toggle == 'off' &&
					<VideoOff size={size/2} color='white'/>
				}
				{
					toggle == 'on' &&
					<VideoOn size={size/2} color='white'/>
				}
				{
					toggle == 'front' &&
					<VideoUser size={size/2} color='white'/>
				}
			</motion.a>,
		close:
			<motion.a
				onClick={click}
				style={toggleBtn(size)}
				whileTap={{ scale: 0.95 }}
			>
				<Close size={0.6*size} color='white' strokeWidth={2}/>
			</motion.a>,
	}
	return buttonTypes[type]
}

CameraButton.propTypes = {
	type: PropTypes.string.isRequired,
	click: PropTypes.func,
}

export default CameraButton