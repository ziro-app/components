import React from 'react'
import { input } from './styles'

const InputTextType1 = props => {
	const { styles, placeholder, name, submitting, value, handleChange } = props
	const style = styles ? styles : input
	return (
		<input
			style={style}
			placeholder={placeholder}
			name={name}
			id={name}
			disabled={submitting}
			value={value}
			onChange={handleChange}
		/>
	)
}

export default InputTextType1