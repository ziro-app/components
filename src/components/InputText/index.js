import React, { forwardRef, Fragment } from 'react'
import { input, focus } from './styles'

const InputText = forwardRef(({ style = input, disabled, submitting, ...rest }, ref) => {
	const inputProps = { style, disabled: disabled || submitting, ref, ...rest }
	return (
		<Fragment>
			<style>{focus}</style>
			<input {...inputProps} className='input-text' />
		</Fragment>
	)
})

export default InputText