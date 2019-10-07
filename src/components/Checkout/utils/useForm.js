import React, { useState } from 'react'
import { validateForm } from './validateForm'

export const useForm = state => {
	const [number, cardholder, expiry, cvv, cpf, installments] = state
	const [error, setError] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const submitForm = async event => {
		event.preventDefault()
		if (validateForm(state)) {
			setSubmitting(true)
			const msg = await new Promise(resolve => setTimeout(() => resolve('submit'), 1000))
			setSubmitting(false)
			console.log(msg)
		} else {
			setError('Verifique campos com erros')
		}
	}
	return [error, submitting, submitForm]
}