import React from 'react'
import PropTypes from 'prop-types'
import Illustration from '../../Illustration/index'
import Button from '../../Button/index'
import { container, svg, title } from './styles'

export const ErrorModal = ({ closeModal }) =>
	<div style={container}>
		<div style={svg}><Illustration type='paymentError' /></div>
		<label style={title}>Erro ao cadastrar!</label>
		<label>Tente novamente ou contate seu assessor</label>
		<Button type='link' cta='Tentar novamente' navigate={closeModal} />
	</div>

ErrorModal.propTypes = {
	closeModal: PropTypes.func.isRequired
}