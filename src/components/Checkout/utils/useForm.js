import React, { useState } from 'react'
import { validateForm } from './validateForm'

export const useForm = state => {
	const [number, cardholder, expiry, cvv, cpf, installments] = state
	const [errors, setErrors] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const submitForm = async event => {
		event.preventDefault()
		const msg = await new Promise(resolve => setTimeout(() => resolve('submit'), 1000))
		console.log(msg)
	}
	const formIsValid = validateForm(state)
	return [errors, submitting, submitForm]
}