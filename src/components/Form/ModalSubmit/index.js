import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '../../Modal/index'
import Spinner from '../../Spinner/index'
import { modalSubmitting, modalResult } from './styles'

export const ModalSubmit = ({ isOpen, submitting, error, successComponent, errorComponent }) => {
	const [closeModal, setCloseModal] = useState(false)
	return (
		<Modal isOpen={!closeModal && isOpen || submitting} setIsOpen={() => null} boxStyle={submitting ? modalSubmitting : modalResult}>
			{submitting ?
				<Spinner size={'5.5rem'} />
				:
				error ? errorComponent(() => setCloseModal(true)) : successComponent()
			}
		</Modal>
	)
}

ModalSubmit.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	submitting: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	successComponent: PropTypes.func.isRequired,
	errorComponent: PropTypes.func.isRequired
}