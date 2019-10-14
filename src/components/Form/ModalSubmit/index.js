import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'wouter'
import Modal from '../../Modal/index'
import Spinner from '../../Spinner/index'
import Button from '../../Button/index'
import Illustration from '../../Illustration/index'
import { container, svg, title, modalSubmitting, modalResult } from './styles'

export const ModalSubmit = ({ isOpen, submitting, error }) => {
	const [, setLocation] = useLocation()
	return (
		<Modal isOpen={isOpen || submitting} setIsOpen={() => null} boxStyle={submitting ? modalSubmitting : modalResult}>
			{submitting ?
				<Spinner size={'5.5rem'} />
				:
				<div style={container}>
					{error ?
						<>
							<div style={svg}><Illustration type='paymentError' /></div>
							<label style={title}>Erro no envio!</label>
							<label>Tente novamente ou contate seu assessor</label>
							<Button type='link' cta='Tentar novamente' navigate={() => setModal(false)} />
						</>
						:
						<>
							<div style={svg}><Illustration type='paymentSuccess' /></div>
							<label style={title}>Processando!</label>
							<label>Acompanhe o status pelo menu Pagamentos</label>
							<Button type='link' cta='Ver pagamentos' navigate={() => setLocation('/payments')} />
						</>
					}
				</div>
			}
		</Modal>
	)
}

ModalSubmit.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	submitting: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired
}