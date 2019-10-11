import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from './utils/useForm'
import InputText from '../InputText/index'
import InputLabel from '../InputLabel/index'
import Badge from '../Badge/index'
import { container } from './styles'

const CreatePayment = props => {
	const [charge, setCharge] = useState('')
	const [errors, submitting, submitError, submitForm] = useForm(charge)
	return (
		<form onSubmit={e => e.preventDefault()}>
			<div style={container}>
				<div>
					<InputLabel
						name='Valor a cobrar'
					/>
					<InputText
						value={charge}
						onChange={({ target: { value } }) => setCharge(value)}
						placeholder='R$1.299,99'
					/>
					<Badge type='alert' message='error' size={12} />
				</div>
			</div>
		</form>
	)
}

CreatePayment.propTypes = {

}

export default CreatePayment