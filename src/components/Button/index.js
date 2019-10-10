import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { btn, btnDisabled } from './styles'

const Button = ({ type, cta, submitting }) => {
	if (type === 'submit') {
		return (
			<motion.input
				style={submitting ? btnDisabled : btn}
				value={cta}
				whileTap={submitting ? null : { scale: 0.95 }}
				type='submit'
			/>)}
	if (type === 'link') {
		return (
			<motion.a
				style={submitting ? btnDisabled : btn}
				whileTap={submitting ? null : { scale: 0.95 }}
			>{cta}</motion.a>)}
}

Button.propTypes = {
	type: PropTypes.string.isRequired,
	cta: PropTypes.string.isRequired,
	submitting: PropTypes.bool
}

export default Button