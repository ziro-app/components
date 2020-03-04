import React, { useEffect, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../Form/utils/useForm'
import Button from '../Button/index'
import Header from '../Header/index'
import { FlowDiv } from '../FlowManager/FlowDiv'
import { useFlowContent } from '../FlowManager/useFlowContent'
import { ModalSubmit } from '../Form/ModalSubmit/index'
import { contentTransitions as _contentTransitions, flowElementsTransitions as _flowElementTransitions } from '../FlowManager/defaultTransitions'
import { scrollShadowTop, scrollShadowBottom, content, singleButton, doubleButton, container, contentContainer } from '../FlowManager/styles'

const FlowForm = ({
	next,
	nextName,
	previous,
	previousName,
	validations,
	inputs,
	controls,
	topView,
	header,
	title,
	setError,
	contentTransitions = _contentTransitions,
	flowElementsTransitions = _flowElementTransitions
}) => {
	
	const [errors, submitting, submitError, submitMsg, setSubmitMsg, submitForm] = useForm()

	const [contentScroll, scrollMaxInset, scrollInsetBottom, scrollInsetTop, overflow] = useFlowContent()

	useEffect(() => {
		if(submitting) setError()
		else if(submitError) setError(submitMsg||true)
	},[submitting, submitError, submitMsg])
	
	return (
		<form onSubmit={submitForm(validations, next)}>
			<div style={container}>
				<FlowDiv {...flowElementsTransitions} controls={controls}>
					{ header || <Header type='title-only' title={title}/> }
				</FlowDiv>
				<FlowDiv {...contentTransitions} controls={controls}>
					{ topView }
				</FlowDiv>
				<FlowDiv
					{...contentTransitions}
					controls={controls}
					contentScroll={contentScroll}
					style={{ ...contentContainer, overflow }}
				>
						<div style={scrollShadowTop(scrollInsetTop, scrollMaxInset)}/>
						<div style={{ ...content, padding: '0px 20px' }}>
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
						<div style={scrollShadowBottom(scrollInsetBottom, scrollMaxInset)}/>
				</FlowDiv>
				<FlowDiv {...flowElementsTransitions} controls={controls} style={next && previous ? doubleButton : singleButton}>
					{
						previous &&
						<Button
							type='button'
							cta={previousName}
							click={previous}
							template='light'
						/>
					}
					<Button type='submit' cta={nextName || 'Enviar'} submitting={submitting} />
				</FlowDiv>
				<ModalSubmit isOpen={submitting} submitting={submitting} error={false} errorComponent={() => null} successComponent={() => null}/>
			</div>
		</form>
	)
}

FlowForm.propTypes = {
	useModalLayoutOnSubmit: PropTypes.bool,
	successComponent: PropTypes.func,
	errorComponent: PropTypes.func,
	buttonName: PropTypes.string,
	buttonOnTop: PropTypes.bool,
	validations: PropTypes.arrayOf(PropTypes.object).isRequired,
	next: PropTypes.func.isRequired,
	previous: PropTypes.func,
	previousName: PropTypes.string,
	summary: PropTypes.element,
	inputs: PropTypes.arrayOf(PropTypes.element).isRequired,
	topView: PropTypes.element,
	title: PropTypes.string.isRequired
}

export default FlowForm