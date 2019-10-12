import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'

const CreatePayment = props => {
	const [charge, setCharge] = useState('')
	const [maxInstallments, setMaxInstallments] = useState('')
	const validations = [
		{
			name: 'charge',
			validation: value => !!value,
			value: charge,
			message: 'Campo obrigatório'
		},
		{
			name: 'maxInstallments',
			validation: value => !!value,
			value: maxInstallments,
			message: 'Campo obrigatório'
		}
	]
	return (
		<Form
			validations={validations}
			inputs={[
				<FormInput
					name='Valor a cobrar'
					input={
						<InputText
							value={charge}
							onChange={({ target: { value } }) => setCharge(value)}
							placeholder='R$1.299,99'
						/>						
					}
				/>,
				<FormInput
					name='Parcelamento máximo'
					input={
						<InputText
							value={maxInstallments}
							onChange={({ target: { value } }) => setMaxInstallments(value)}
							placeholder='6'
						/>						
					}
				/>				
			]}
		/>
	)
	// return (
	// 	<form onSubmit={submitForm(validations)}>
	// 		<div style={container}>
				// <FormInput
				// 	name='Valor a cobrar'
				// 	errorMsg={errors.charge}
				// 	input={
				// 		<InputText
				// 			value={charge}
				// 			onChange={({ target: { value } }) => setCharge(value)}
				// 			submitting={submitting}
				// 			placeholder='R$1.299,99'
				// 		/>						
				// 	}
				// />
				// <FormInput
				// 	name='Parcelamento máximo'
				// 	errorMsg={errors.maxInstallments}
				// 	input={
				// 		<InputText
				// 			value={maxInstallments}
				// 			onChange={({ target: { value } }) => setMaxInstallments(value)}
				// 			submitting={submitting}
				// 			placeholder='6'
				// 		/>						
				// 	}
				// />
	// 			<label style={submit(submitError)}>&nbsp;{submitting ? <Spinner size='3rem' /> : submitMsg}</label>
	// 			<Button type='submit' cta='Enviar' submitting={submitting} />
	// 		</div>
	// 	</form>
	// )
}

CreatePayment.propTypes = {

}

export default CreatePayment