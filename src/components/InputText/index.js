import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { inline, styleTag } from './styles'

const InputText = forwardRef(({ style = inline, css = styleTag, disabled, submitting, ...rest }, ref) => {
	const inputProps = { style, disabled: disabled || submitting, ref, ...rest }
	return (
		<>
			<style>{css}</style>
			<input {...inputProps} className='input-text' />
		</>
	)
})

InputText.propTypes = {
	/** Objeto contendo propriedades de estilo utilizadas no input. */
	style: PropTypes.object,
	/** String contendo o estilo inline utilizado no input. */
	css: PropTypes.string,
	/** Define se o campo está ou não habilitado para edição. */
	disabled: PropTypes.bool,
	/** Define se o campo está sendo submetido. */
	submitting: PropTypes.bool
}

export default InputText