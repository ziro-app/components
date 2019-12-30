import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { btn, btnDisabled } from './styles'

const Button = ({ type, cta, submitting, navigate, click, style }) => {
	const btnStyle = style || btn
	const tapAnimation = submitting ? null : { scale: 0.95 }
	const buttonTypes = {
		submit:
			<motion.input
				style={submitting ? btnDisabled : btnStyle}
				value={cta}
				whileTap={tapAnimation}
				type='submit'
			/>,
		link:
			<motion.a
				onClick={navigate}
				style={submitting ? btnDisabled : btnStyle}
				whileTap={tapAnimation}
			>{cta}</motion.a>,
		click:
			<motion.input
				onClick={click}
				style={submitting ? btnDisabled : btnStyle}
				value={cta}
				whileTap={tapAnimation}
				type='submit'
			/>
	}
	return buttonTypes[type]
}

Button.propTypes = {
	type: PropTypes.string.isRequired,
	cta: PropTypes.string.isRequired,
	submitting: PropTypes.bool,
	navigate: PropTypes.func,
	click: PropTypes.func,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}

export default Button