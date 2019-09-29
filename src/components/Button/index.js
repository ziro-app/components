import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { btn } from './styles'
// import { Errors } from './Errors'
// import { Spinner } from '../../../Assets/Spinner/index'
// import { buttonWrapper, loader, submit, submitDisabled, scaleButton, forgotPass } from './styles'

const Button = () => {
	const start = {
		transform: 'scale(1)'
	}
	const end = {
		transform: 'scale(0.95)'
	}
	const [animate, setAnimate] = useState(false)
	return (
		<motion.input
			style={btn}
			type='submit'
			value='Confirmar'
			whileTap={{ scale: 0.95 }}
		/>
	)
}

export default Button

// export const Button = ({ submitting, authError }) =>
// 	<div style={buttonWrapper}>
// 		<div style={loader}>
// 			{submitting ? <Spinner size={'4rem'} /> : <Errors message={authError} />}
// 		</div>
// 		<motion.input
// 			style={submitting ? submitDisabled : submit}
// 			type='submit'
// 			value='Acessar'
// 			whileTap={submitting ? null : scaleButton}
// 		/>
// 		<label style={forgotPass}>Esqueci a senha</label>
// 	</div>

// Button.propTypes = {
// 	submitting: PropTypes.bool.isRequired,
// 	authError: PropTypes.string.isRequired
// }