import React, { useState } from 'react'
import { validateForm } from './validateForm'

export const useForm = state => {
	const [number, cardholder, expiry, cvv, cpf, installments] = state
	const [errors, setErrors] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const submitForm = async event => {
		event.preventDefault()
		if (validateForm(state)) {
			setSubmitting(true)
			const msg = await new Promise(resolve => setTimeout(() => resolve('submit'), 10000))
			setSubmitting(false)
			console.log(msg)
		} else {
			setErrors('Verifique campos com erros')
		}
	}
	return [errors, submitting, submitForm]
}