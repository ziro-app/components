import React, { useState } from 'react'
import { validateForm } from './validateForm'

export const useForm = () => {
	const [errors, setErrors] = useState({})
	const [submitting, setSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState(false)
	const [submitMsg, setSubmitMsg] = useState('')
	const submitForm = (validations, sendToBackend) => async event => {
		event.preventDefault()
		const [formIsValid, errorMessages] = validateForm(validations)
		setErrors(errorMessages)
		setSubmitError(false)
		setSubmitMsg('')
		if (formIsValid) {
			setSubmitting(true)
			try {
				setSubmitMsg(await sendToBackend())
			} catch (error) {
				setSubmitError(true)
				if (error.db)
					setSubmitMsg(error.msg)
				else setSubmitMsg('Erro no envio. Tente novamente')
				console.log(error)
			}
			setSubmitting(false)
		}
	}
	return [errors, submitting, submitError, submitMsg, submitForm]
}