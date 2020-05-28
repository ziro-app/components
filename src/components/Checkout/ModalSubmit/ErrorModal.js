import React from 'react'
import PropTypes from 'prop-types'
import Illustration from '../../Illustration/index'
import Button from '../../Button/index'
import { container, svg, titleError } from './styles'

export const ErrorModal = ({ closeModal, errorMsg = 'Tente novamente ou contate seu assessor' }) =>
	<div style={container}>
		<div style={svg}><Illustration type='paymentError' /></div>
		<label style={titleError}>Erro no envio!</label>
		<label>{errorMsg}</label>
		<Button type='link' cta='Tentar novamente' navigate={closeModal} />
	</div>

ErrorModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	errorMsg: PropTypes.string
}