import React, { useState } from 'react'
import { validateForm } from './validateForm'

export const useForm = (state, setModal) => {
	const [number, cardholder, expiry, cvv, cpf, installments] = state
	const [hasError, setHasError] = useState('')
	const [errors, setErrors] = useState({})
	const [submitting, setSubmitting] = useState(false)
	const submitForm = async event => {
		event.preventDefault()
		setHasError('')
		setErrors({})
		const [formIsValid, errors] = validateForm(state)
		if (formIsValid) {
			setSubmitting(true)
			setModal(true)
			const msg = await new Promise(resolve => setTimeout(() => resolve('submit'), 1000))
			setSubmitting(false)
			console.log(msg)
		} else {
			setHasError('Verifique campos com erros')
			setErrors(errors)
		}
	}
	return [hasError, errors, submitting, submitForm]
}