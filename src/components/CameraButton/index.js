import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { shooterBtn, btn } from './styles'
import { VideoOff } from '../../Icons/VideoOff'
import { VideoOn } from '../../Icons/VideoOn'
import { VideoToggle } from '../../Icons/VideoToggle'
import { Close } from '../../Icons/Close'

const CameraButton = ({ type, click, position, size=50, disabled }) => {
	const anim = !disabled && { scale: 0.95 }
	const buttonTypes = {
		shooter:
			(({ border, middle }) => (
				<motion.a
					onClick={disabled ? undefined : click}
					style={border}
					whileTap={anim}
				>
					<div style={middle}/>
				</motion.a>
			))(shooterBtn(size,disabled)),
		video:
			<motion.a
				onClick={disabled ? undefined : click}
				style={btn(size,disabled)}
				whileTap={anim}
			>
				{
					position == 'off' &&
					<VideoOff size={size/2} color='white'/>
				}
				{
					position == 'on' &&
					<VideoOn size={size/2} color='white'/>
				}
			</motion.a>,
		swap:
			<motion.a
				onClick={disabled ? undefined : click}
				style={btn(size,disabled)}
				whileTap={anim}
			>
				<VideoToggle size={size/2} color='white'/>
			</motion.a>,
		close:
			<motion.a
				onClick={disabled ? undefined : click}
				style={btn(size,disabled)}
				whileTap={anim}
			>
				<Close size={0.6*size} color='white' strokeWidth={2}/>
			</motion.a>,
	}
	return buttonTypes[type]
}

CameraButton.propTypes = {
	type: PropTypes.string.isRequired,
	click: PropTypes.func,
	position: PropTypes.string,
	size: PropTypes.number,
	disabled: PropTypes.bool
}

export default CameraButton