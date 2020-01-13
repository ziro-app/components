import React, { useEffect, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { useForm } from './utils/useForm'
import Button from '../Button/index'
import Spinner from '../Spinner/index'
import { ModalSubmit } from './ModalSubmit/index'
import { container, whiteSpace, submit } from './styles'

const Form = ({ useModalLayoutOnSubmit, successComponent, errorComponent, buttonName, validations, sendToBackend, summary, inputs }) => {
	const [errors, submitting, submitError, submitMsg, setSubmitMsg, submitForm] = useForm()
	useEffect(() => {
		// if user start typing on any field, reset submit message
		if (submitMsg) setSubmitMsg('')
	}, [inputs])
	return (
		<form onSubmit={submitForm(validations, sendToBackend)}>
			<div style={container}>
				{inputs.map((reactElement, index) => {
					if (reactElement.type === 'div') {
						const children = reactElement.props.children.map((element, innerIndex) => {
							const InputTextWithSubmitting = cloneElement(element.props.input, { submitting })
							const [match] = validations.filter(value => value.name === element.props.name)
							return cloneElement(element, {
								key: `${index}-${innerIndex}`, 
								input: InputTextWithSubmitting,
								errorMsg: match ? errors[match.name] : match
							})
						})
						return cloneElement(reactElement, { key: index, children })
					} else {
						const InputTextWithSubmitting = cloneElement(reactElement.props.input, { submitting })
						const [match] = validations.filter(value => value.name === reactElement.props.name)
						return cloneElement(reactElement, {
							key: index,
							input: InputTextWithSubmitting,
							errorMsg: match ? errors[match.name] : match
						})
					}
				})}
				{summary && summary}
				{useModalLayoutOnSubmit ? <div style={whiteSpace}></div> : null}
				{useModalLayoutOnSubmit
					? <ModalSubmit isOpen={!!submitMsg} submitting={submitting} error={submitError} successComponent={successComponent} errorComponent={errorComponent} />
					: <label style={submit(submitError)}>&nbsp;{submitting ? <Spinner size='3rem' /> : submitMsg}</label>
				}
				<Button type='submit' cta={buttonName || 'Enviar'} submitting={submitting} />
			</div>
		</form>
	)
}

Form.propTypes = {
	useModalLayoutOnSubmit: PropTypes.bool,
	successComponent: PropTypes.func,
	errorComponent: PropTypes.func,
	buttonName: PropTypes.string,
	validations: PropTypes.arrayOf(PropTypes.object).isRequired,
	sendToBackend: PropTypes.func.isRequired,
	summary: PropTypes.element,
	inputs: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default Form