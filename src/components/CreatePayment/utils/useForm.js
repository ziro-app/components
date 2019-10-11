import React, { useState } from 'react'
// import { validateForm } from './validateForm'

export const useForm = state => {
	const [errors, setErrors] = useState({})
	const [submitting, setSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState('')
	const submitForm = async event => {
		event.preventDefault()
		setErrors({})
		setSubmitError('')
		const [formIsValid, errorMessages] = [true, {}] // validateForm(state)
		if (formIsValid) {
			setSubmitting(true)
			try {
				const msg = await new Promise(resolve => setTimeout(() => resolve('submit'), 1000))
				console.log(msg)
			} catch (error) {
				setSubmitError('Erro no envio. Tente novamente ou contate suporte')
				console.log(error)
			}
			setSubmitting(false)

		} else {
			setErrors({ formIsValid, errorMessages })
		}
	}
	return [errors, submitting, submitError, submitForm]
}