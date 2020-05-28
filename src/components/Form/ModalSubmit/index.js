import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Modal from '../../Modal/index'
import Spinner from '../../Spinner/index'
import { modalSubmitting, modalResult, svg } from './styles'

export const ModalSubmit = ({ isOpen, submitting, error, successComponent, errorComponent, errorMsg }) => {
	const [closeModal, setCloseModal] = useState(false)
	useEffect(() => {
		if (submitting) setCloseModal(false)
	}, [submitting])
	return (
		<Modal isOpen={!closeModal && isOpen || submitting} setIsOpen={() => null} boxStyle={submitting ? modalSubmitting : modalResult}>
			{submitting ?
				<Spinner style={svg} size={'5.5rem'} />
				:
				error ? errorComponent(() => setCloseModal(true), errorMsg) : successComponent()
			}
		</Modal>
	)
}

ModalSubmit.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	submitting: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	successComponent: PropTypes.func.isRequired,
	errorComponent: PropTypes.func.isRequired,
	errorMsg: PropTypes.string
}