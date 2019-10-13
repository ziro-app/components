import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/index'
import Spinner from '../Spinner/index'
import { useForm } from './utils/useForm'
import { container, submit } from './styles'

const Form = ({ buttonName, validations, sendToBackend, summary, inputs }) => {
	const [errors, submitting, submitError, submitMsg, submitForm] = useForm()
	return (
		<form onSubmit={submitForm(validations, sendToBackend)}>
			<div style={container}>
				{inputs.map((reactElement, index) => {
					const InputTextWithSubmitting = cloneElement(reactElement.props.input, { submitting })
					const [match] = validations.filter(value => value.name === reactElement.props.name)
					return cloneElement(reactElement,
						{
							key: index,
							input: InputTextWithSubmitting,
							errorMsg: match ? errors[match.name] : match
						})
				})}
				{summary && summary}
				<label style={submit(submitError)}>&nbsp;{submitting ? <Spinner size='3rem' /> : submitMsg}</label>
				<Button type='submit' cta={buttonName || 'Enviar'} submitting={submitting} />
			</div>
		</form>
	)
}

Form.propTypes = {
	buttonName: PropTypes.string,
	validations: PropTypes.arrayOf(PropTypes.object).isRequired,
	sendToBackend: PropTypes.func.isRequired,
	summary: PropTypes.element,
	inputs: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default Form