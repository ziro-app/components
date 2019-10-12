import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/index'
import Spinner from '../Spinner/index'
import { useForm } from './utils/useForm'
import { container, submit } from './styles'

const Form = ({ validations, inputs }) => {
	const [errors, submitting, submitError, submitMsg, submitForm] = useForm()
	return (
		<form onSubmit={submitForm(validations)}>
			<div style={container}>
				{inputs.map((reactElement, index) => {
					const InputTextWithSubmitting = cloneElement(reactElement.props.input, { submitting })
					return cloneElement(reactElement,
						{
							key: index,
							input: InputTextWithSubmitting,
							errorMsg: errors[validations[index].name]
						})
				})}
				<label style={submit(submitError)}>&nbsp;{submitting ? <Spinner size='3rem' /> : submitMsg}</label>
				<Button type='submit' cta='Enviar' submitting={submitting} />
			</div>
		</form>
	)
}

Form.propTypes = {
	validations: PropTypes.arrayOf(PropTypes.object).isRequired,
	inputs: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default Form