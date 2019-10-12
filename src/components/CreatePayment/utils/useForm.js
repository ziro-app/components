import React, { useState } from 'react'
import { validateForm } from './validateForm'

export const useForm = () => {
	const [errors, setErrors] = useState({})
	const [submitting, setSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState(false)
	const [submitMsg, setSubmitMsg] = useState('')
	const submitForm = validations => async event => {
		event.preventDefault()
		const [formIsValid, errorMessages] = validateForm(validations)
		setErrors(errorMessages)
		setSubmitError(false)
		setSubmitMsg('')
		if (formIsValid) {
			setSubmitting(true)
			try {
				const msg = await new Promise((resolve, reject) => setTimeout(() => reject('submit'), 1000))
				setSubmitMsg('Enviado com sucesso!')
				console.log(msg)
			} catch (error) {
				setSubmitError(true)
				setSubmitMsg('Erro no envio. Tente novamente ou contate suporte')
				console.log(error)
			}
			setSubmitting(false)
		}
	}
	return [errors, submitting, submitError, submitMsg, submitForm]
}