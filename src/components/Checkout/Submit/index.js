import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../Modal/index'
import Spinner from '../../Spinner/index'
import Button from '../../Button/index'
import { PaymentSuccess } from '../../../Illustrations/PaymentSuccess/index'
import { container, modalBox } from './styles'

export const Submit = ({ submitting, modal, setModal }) =>
	<Modal isOpen={modal} setIsOpen={() => setModal(false)} boxStyle={modalBox}>
		{submitting
		? <Spinner size={'5.5rem'} />
		: <div>
		  	  <PaymentSuccess />
		  	  <h1>Em processamento!</h1>
		  	  <label>Visite o menu Pagamentos para acompanhar o status</label>
		  	  <Button cta='Continuar' />
		  </div>}
	</Modal>

Submit.propTypes = {
	submitting: PropTypes.bool.isRequired,
	modal: PropTypes.bool.isRequired,
	setModal: PropTypes.func.isRequired
}