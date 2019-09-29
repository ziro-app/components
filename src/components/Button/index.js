import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated as a } from 'react-spring'
// import { motion } from 'framer-motion'
// import { Errors } from './Errors'
// import { Spinner } from '../../../Assets/Spinner/index'
// import { buttonWrapper, loader, submit, submitDisabled, scaleButton, forgotPass } from './styles'

const Button = () => {
	const buttonAnimation = useSpring({ transform: 'scale(0.95)', from: { transform: 'scale(1)' } })
	const [animate, setAnimate] = useState(false)
	return (
		<a.input
			style={animate ? buttonAnimation : null}
			onTouchStart={() => setAnimate(true)}
			onTouchEnd={() => setAnimate(false)}
			onMouseDown={() => setAnimate(true)}
			onMouseUp={() => setAnimate(false)}
			type='submit'
			value='Confirmar'
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