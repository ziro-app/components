import React, { useEffect, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../Form/utils/useForm'
import Button from '../Button/index'
import Spinner from '../Spinner/index'
import Header from '../Header/index'
import { FlowDiv } from '../FlowManager/FlowDiv'
import { useFlowContent } from '../FlowManager/useFlowContent'
import { ModalSubmit } from '../Form/ModalSubmit/index'
import { whiteSpace, submit, submitTop } from '../Form/styles'
import { scrollShadowTop, scrollShadowBottom, content, singleButton, doubleButton, container } from '../FlowManager/styles'

const FlowForm = ({ useModalLayoutOnSubmit, successComponent, errorComponent, buttonName, previous, previousName, buttonOnTop, validations, next, summary, inputs, controls, topView, title }) => {
	
	const [errors, submitting, submitError, submitMsg, setSubmitMsg, submitForm] = useForm()

	const [contentScroll, scrollMaxInset, scrollInsetBottom, scrollInsetTop, overflowY, overflowX] = useFlowContent()

	useEffect(() => {
		// if user start typing on any field, reset submit message
		if (submitMsg) setSubmitMsg('')
	}, [inputs])
	
	return (
		<form onSubmit={submitForm(validations, next)}>
			<div style={container}>
				<FlowDiv controls={controls}>
					<Header type='title-only' title={title}/>
				</FlowDiv>
				<FlowDiv
					controls={controls}
					normal={{ scale: 1, x: '0%', y: '0%', opacity: 1 }}
					next={{ x: '-150%' }}
					previous={{ x: '150%' }}
					diverge={{ scale: 0.8, opacity: 0 }}
					converge={{ y: '20%', opacity: 0 }}
				>{ topView }</FlowDiv>
				<div style={{ position: 'relative', display: 'grid', overflowY, overflowX, gridTemplate: 'auto' }}>
					<FlowDiv controls={controls}>
						<div style={scrollShadowTop(scrollInsetTop, scrollMaxInset)}/>
					</FlowDiv>
					<FlowDiv
						controls={controls}
						normal={{ scale: 1, x: '0%', y: '0%', opacity: 1 }}
						next={{ x: '-150%' }}
						previous={{ x: '150%' }}
						diverge={{ scale: 0.8, opacity: 0 }}
						converge={{ y: '20%', opacity: 0 }}
						style={{ ...content, overflowY, overflowX, padding: '0px 20px' }}
						contentScroll={contentScroll}
					>
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
					</FlowDiv>
					<FlowDiv controls={controls}>
						<div style={scrollShadowBottom(scrollInsetBottom, scrollMaxInset)}/>
					</FlowDiv>
				</div>
					{buttonOnTop
					?
						<>
							<FlowDiv controls={controls} style={next && previous ? doubleButton : singleButton}>
								{
									previous &&
									<Button
										type='click'
										blockSubmit={true}
										cta={previousName}
										click={previous}
										style='light'
									/>
								}
								<Button type='submit' cta={buttonName || 'Enviar'} submitting={submitting} />
							</FlowDiv>
							<label style={submitTop(submitError)}>&nbsp;{submitting ? <Spinner size='3rem' /> : submitMsg}</label>
						</>
					:
						<>
							{summary && summary}
							{useModalLayoutOnSubmit ? <div style={whiteSpace}></div> : null}
							{useModalLayoutOnSubmit
								? <ModalSubmit isOpen={!!submitMsg} submitting={submitting} error={submitError} successComponent={successComponent} errorComponent={errorComponent} />
								: <label style={submit(submitError)}>&nbsp;{submitting ? <Spinner size='3rem' /> : submitMsg}</label>
							}
							<FlowDiv controls={controls} style={previous ? doubleButton : singleButton}>
								{
									previous &&
									<Button
										type='click'
										blockSubmit={true}
										cta={previousName}
										click={previous}
										style='light'
									/>
								}
								<Button type='submit' cta={buttonName || 'Enviar'} submitting={submitting} />
							</FlowDiv>
						</>
					}
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