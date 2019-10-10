import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../Modal/index'
import Spinner from '../../Spinner/index'
import Button from '../../Button/index'
import { PaymentSuccess } from '../../../Illustrations/PaymentSuccess/index'
import { container, svg, title, modalSubmitting, modalResult } from './styles'

export const Submit = ({ submitting, modal, setModal }) => {
	if (submitting) {
		return (
			<Modal isOpen={modal} setIsOpen={() => setModal(false)} boxStyle={modalSubmitting}>
				<Spinner size={'5.5rem'} />
			</Modal>
		)
	} else {
		return (
			<Modal isOpen={modal} setIsOpen={() => setModal(false)} boxStyle={modalResult}>
				<div style={container}>
					<div style={svg}><PaymentSuccess /></div>
					<label style={title}>Processando!</label>
					<label>Acompanhe o status pelo menu Pagamentos</label>
					<Button type='link' cta='Continuar' />
				</div>
			</Modal>
		)
	}
}

Submit.propTypes = {
	submitting: PropTypes.bool.isRequired,
	modal: PropTypes.bool.isRequired,
	setModal: PropTypes.func.isRequired
}