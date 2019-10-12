import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from './utils/useForm'
import InputText from '../InputText/index'
import InputLabel from '../InputLabel/index'
import Badge from '../Badge/index'
import Button from '../Button/index'
import Spinner from '../Spinner/index'
import { alertColor } from '../../Theme/variables'
import { container, labelHeader, error, submit } from './styles'

const CreatePayment = props => {
	const [charge, setCharge] = useState('')
	const [errors, submitting, submitError, submitMsg, submitForm] = useForm()
	const validations = [
		{
			name: 'charge',
			validation: value => !!value,
			value: charge,
			message: 'Campo obrigatório'
		}
	]
	return (
		<form onSubmit={submitForm(validations)}>
			<div style={container}>
				<div>
					<InputLabel
						styleHeader={labelHeader}
						name='Valor a cobrar'
					/>
					<InputText
						value={charge}
						onChange={({ target: { value } }) => setCharge(value)}
						submitting={submitting}
						placeholder='R$1.299,99'
					/>
					<label style={error}>
						&nbsp;{errors.charge && <Badge type='alert' message={errors.charge} size={12} color={alertColor} />}
					</label>
				</div>
				<label style={submit(submitError)}>&nbsp;{submitting ? <Spinner size='3rem' /> : submitMsg}</label>
				<Button type='submit' cta='Enviar' submitting={submitting} />
			</div>
		</form>
	)
}

CreatePayment.propTypes = {

}

export default CreatePayment