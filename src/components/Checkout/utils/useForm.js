import React, { useState } from 'react'
import { validateForm } from './validateForm'

export const useForm = (state, setModal) => {
	const [number, cardholder, expiry, cvv, cpf, installments] = state
	const [hasError, setHasError] = useState('')
	const [errors, setErrors] = useState({})
	const [submitting, setSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState(false)
	const submitForm = async event => {
		event.preventDefault()
		setHasError('')
		setErrors({})
		setSubmitError(false)
		const [formIsValid, errors] = validateForm(state)
		if (formIsValid) {
			setSubmitting(true)
			setModal(true)
			try {
				const msg = await new Promise(resolve => setTimeout(() => resolve('submit'), 1000))
				console.log(msg)
			} catch (error) {
				setSubmitError(true)
				console.log(error)
			}
			setSubmitting(false)

		} else {
			setHasError('Verifique campos com erros')
			setErrors(errors)
		}
	}
	return [hasError, errors, submitting, submitForm, submitError]
}