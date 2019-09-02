import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useMachine } from './stateMachine'
import InputNotice from '../InputNotice/index'
import InputLabel from '../InputLabel/index'
import InputText from '../InputText/index'
import Badge from '../Badge/index'
import Icon from '../Icon/index'
import Spinner from '../../Spinner/index'
import { successColor, alertColor, warningColor } from '../../Theme/variables'
import { container, save, spinner, inputInline, inputStylesheet } from './styles'

const EditableData = ({ name, value, onChange, validateInput, submit, setError, error, warning = '', placeholder = '', isValidated = false, editable = true }) => {
	const [uiState, transition] = useMachine('idle')
	const input = useRef(null)
	const selectInput = () => input && input.current ? input.current.select() : null
	const updateInput = event => {
		transition('EDIT')
		setError('')
		onChange(event)
	}
	const saveData = async event => {
		event.preventDefault()
		if (validateInput()) {
			try {
				transition('SUBMIT')
				await submit()
				transition('OK')
			} catch (error) {
				console.log(error)
				transition('ERROR')
				setError('erro no envio. Tente novamente')
				selectInput()
			}
		} else {
			transition('ERROR')
			selectInput()
		}
	}
	const clickable = editable || uiState === 'submitting' ? selectInput : undefined
	const display = {
		idle: <Icon type='pen' size={13} />,
		editing: <input type='submit' style={save} value='Salvar' />,
		submitting: <Spinner size={'2rem'} style={spinner} />,
		success: <Icon type='pen' size={13} />,
		error: <input type='submit' style={save} value='Salvar' />
	}
	return (
		<form style={container} onSubmit={saveData} onClick={clickable}>
			<div>{uiState}</div>
			<InputNotice
				uiState={uiState}
				hasError={Boolean(error)}
				error={<Badge type='alert' size={9} color={alertColor} strokeWidth={3} message={error}/>}
				hasWarning={Boolean(warning)}
				warning={<Badge type='warning' size={9} color={warningColor} strokeWidth={3} message={warning}/>}
			/>
			<InputLabel
				name={name}
				hasBadge={isValidated}
				badge={<Badge type='success' size={9} color={successColor} strokeWidth={3} message='validado'/>}
				hasUiState={editable}
				displayUiState={display[uiState]}
			/>
			<InputText
				style={inputInline}
				css={inputStylesheet}
				ref={input}
				value={value}
				onChange={updateInput}
				placeholder={placeholder}
				disabled={!editable || uiState === 'submitting'}
			/>
		</form>
	)
}

EditableData.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	validateInput: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
	setError: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired,
	warning: PropTypes.string,
	placeholder: PropTypes.string,
	isValidated: PropTypes.bool,
	editable: PropTypes.bool
}

export default EditableData