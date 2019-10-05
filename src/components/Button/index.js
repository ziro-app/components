import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { btn, btnDisabled } from './styles'

const Button = ({ submitting, cta }) =>
	<motion.input
		style={submitting ? btnDisabled : btn}
		value={cta}
		whileTap={submitting ? null : { scale: 0.95 }}
		type='submit'
	/>

Button.propTypes = {
	submitting: PropTypes.bool.isRequired,
	cta: PropTypes.string.isRequired
}

export default Button