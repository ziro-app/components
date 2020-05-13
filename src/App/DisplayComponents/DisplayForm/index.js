import React, { useState } from 'react'
import Form from '../../../components/Form/index'
import FormInput from '../../../components/FormInput/index'
import InputText from '../../../components/InputText/index'
import Icon from '../../../components/Icon/index'
import { containerWithPadding } from '@ziro/theme'

const styled = () => <div style={{
	display: 'grid',
	marginBottom: '15px'
}} >
	<label style={{ fontSize: '1.3rem', fontFamily: 'Rubik', textTransform: 'uppercase', textAlign: 'center' }}>Identificação (RG, CNH) - Frente e Verso <Icon type="help" size={18} color='#F7BA00' /></label>
</div>

export const DisplayForm = () => {
	const [email, setEmail] = useState('')
	const validations = [
		{
			name: 'email',
			validation: value => /^\S+@\S+\.\S+$/g.test(value), // tests for pattern a@b.c
			value: email,
			message: 'Formato inválido'
		}
	]
	return (
		<div style={containerWithPadding}>
			<Form
				buttonOnTop={true}
				validations={validations}
				sendToBackend={() => new Promise((res,rej) => res('Ok'))}
				inputs={[
					<FormInput name='email' label='Email' LabelComponent={styled} input={
						<InputText
							value={email}
							onChange={({ target: { value } }) => setEmail(value)}
							placeholder='Seu email'
						/>
					}/>
				]}
			/>
		</div>
	)
}