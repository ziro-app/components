import React, { useState } from 'react'
// import { validateForm } from './validateForm'

export const useForm = () => {
	const [errors, setErrors] = useState({})
	const [submitting, setSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState('')
	const validateForm = validations => {
		let fieldsAreValid = []
		let errorMessages = {}
		for (let i = 0; i < validations.length; i++) {
			let state = validations[i]
			let fieldIsValid = state.validation(state.value)
			fieldsAreValid.push(fieldIsValid)
			errorMessages[state.name] = fieldIsValid ?  '' : state.message
		}
		const formIsValid = fieldsAreValid.every(field => field)
		return [formIsValid, errorMessages]
	}
	const submitForm = validations => async event => {
		event.preventDefault()
		setSubmitError('')
		const [formIsValid, errorMessages] = validateForm(validations)
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