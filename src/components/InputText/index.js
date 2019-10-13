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
	style: PropTypes.object,
	css: PropTypes.string,
	disabled: PropTypes.bool,
	submitting: PropTypes.bool
}

export default InputText