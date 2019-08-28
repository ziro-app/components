import React, { forwardRef, Fragment } from 'react'
import { inline, styleTag } from './styles'

const InputText = forwardRef(({ style = inline, css = styleTag, disabled, submitting, ...rest }, ref) => {
	const inputProps = { style, disabled: disabled || submitting, ref, ...rest }
	return (
		<Fragment>
			<style>{css}</style>
			<input {...inputProps} className='input-text' />
		</Fragment>
	)
})

export default InputText