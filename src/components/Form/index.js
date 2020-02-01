import React, { useEffect, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { useForm } from './utils/useForm'
import Button from '../Button/index'
import Spinner from '../Spinner/index'
import { ModalSubmit } from './ModalSubmit/index'
import { container, whiteSpace, submit, submitTop } from './styles'

const Form = ({ useModalLayoutOnSubmit, successComponent, errorComponent, buttonName, buttonOnTop, validations, sendToBackend, summary, inputs }) => {
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
				{buttonOnTop
					?
					<>
						<Button type='submit' cta={buttonName || 'Enviar'} submitting={submitting} />
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
						<Button type='submit' cta={buttonName || 'Enviar'} submitting={submitting} />
					</>
				}
			</div>
		</form>
	)
}

Form.propTypes = {
	/** Propriedade que define se será utilizado o ModalSubmit. */
	useModalLayoutOnSubmit: PropTypes.bool,
	/** Função usada para montar o componente de sucesso utilizado. */
	successComponent: PropTypes.func,
	/** Função usada para montar o componente de falha utilizado. */
	errorComponent: PropTypes.func,
	/** Propriedade que define o texto do botão do formulário. */
	buttonName: PropTypes.string,
	/** Propriedade que define onde ficará o botão. */
	buttonOnTop: PropTypes.bool,
	/** Array contendo objetos com funções de validação dos campos do formulário. */
	validations: PropTypes.arrayOf(PropTypes.object).isRequired,
	/** Função executada ao submeter o formulário. */
	sendToBackend: PropTypes.func.isRequired,
	/** Objeto contendo um resumo do formulário. */
	summary: PropTypes.element,
	/** Array contendo todos os objetos Input do formulário. */
	inputs: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default Form