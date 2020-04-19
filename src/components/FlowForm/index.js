import React, { cloneElement, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../Form/utils/useForm'
import { ModalSubmit } from '../Form/ModalSubmit'
import { container, content } from '../FlowManager/styles'
import BottomFlowButtons from '../BottomFlowButtons'
import { useFooter, useModal, useSubmitModal } from '../FlowManager'
import { useEffect } from 'react'

const FlowForm = ({
	validations,
	inputs,
	next,
	nextName,
	previous,
	previousName,
}) => {
	
	const [errors, submitting, submitError, submitMsg, setSubmitMsg, submitForm] = useForm()

	const _validations = useMemo(() => validations, validations.map(({ value }) => value))

	useFooter(
		<BottomFlowButtons 
			next={() => submitForm(_validations, next)({ preventDefault: () => {} })}
			nextTitle={nextName}
			previous={previous}
			previousTitle={previousName}
		/>
	,[_validations, next, previous, previousName, nextName])

	const setSubmitModal = useSubmitModal()

	useEffect(() => { setSubmitModal(submitting) },[submitting])
	
	return (
		<form>
			<div style={container}>
				<div style={{ ...content, padding: '10px 20px' }}>
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
				</div>
			</div>
		</form>
	)
}

FlowForm.propTypes = {
	validations: PropTypes.arrayOf(PropTypes.object).isRequired,
	next: PropTypes.func.isRequired,
	nextName: PropTypes.string,
	previous: PropTypes.func,
	previousName: PropTypes.string,
	inputs: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default FlowForm