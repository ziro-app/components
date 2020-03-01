import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { regular, disabled, destructive, light } from './styles'

const Button = ({ type, cta, submitting, navigate, click, style, template = 'regular' }) => {
	const btnStyle = {
		regular: regular,
		destructive: destructive,
		light: light,
	}
	const tapAnimation = submitting ? null : { scale: 0.95 }
	const buttonTypes = {
		submit:
			<motion.input
				style={submitting ? disabled : style || btnStyle[template]}
				value={cta}
				whileTap={tapAnimation}
				type='submit'
			/>,
		button:
			<motion.input
				style={submitting ? disabled : style || btnStyle[template]}
				value={cta}
				whileTap={tapAnimation}
				onClick={click}
				type='button'
			/>,
		link:
			<motion.a
				style={submitting ? disabled : style || btnStyle[template]}
				whileTap={tapAnimation}
				onClick={navigate}
			>{cta}</motion.a>
	}
	return buttonTypes[type]
}

Button.propTypes = {
	type: PropTypes.string.isRequired,
	cta: PropTypes.string.isRequired,
	submitting: PropTypes.bool,
	navigate: PropTypes.func,
	click: PropTypes.func,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	template: PropTypes.string
}

export default Button