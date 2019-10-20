import React from 'react'
import PropTypes from 'prop-types'
import Illustration from '../Illustration/index'
import { container, svg, title } from './styles'

const ErrorLoading = ({ message }) =>
	<div style={container}>
		<div style={svg}><Illustration type='errorLoading' /></div>
		<label style={title}>Ocorreu um erro!</label>
		<label>{message || 'Recarregue a página ou contate seu assessor'}</label>
	</div>

ErrorLoading.propTypes = {
	message: PropTypes.string
}

export default ErrorLoading