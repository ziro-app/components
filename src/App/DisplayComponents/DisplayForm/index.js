import React, { useState } from 'react'
import Form from '../../../components/Form/index'
import FormInput from '../../../components/FormInput/index'
import InputEmail from '../../../components/InputEmail/index'
import Icon from '../../../components/Icon/index'
import Modal from '../../../components/Modal/index'
import { containerWithPadding } from '@ziro/theme'

const modalContainer = {
	display: 'grid',
	marginBottom: '15px',
	textAlign: 'start'
}
const modalLabel = {
	fontFamily: 'Rubik',
	fontSize: '1.3rem',
	textTransform: 'uppercase'
}

const CnpjText = () => {
	const [modalCNPJ, setModalCNPJ] = useState(false);

	return (
		<div style={modalContainer}>
			<Modal isOpen={modalCNPJ} setIsOpen={() => setModalCNPJ(false)}>
				<label style={modalLabel}>
					Nos envie o cartão CNPJ de sua empresa, como no exemplo a seguir
                    </label>
				<img
					src="https://res.cloudinary.com/ziro/image/upload/v1589511807/nota_xpxiek.jpg"
					alt="Cartão CNPJ"
					style={{ paddingTop: '20px', width: '100%', height: '100%', alignContent: 'center' }}
				/>
			</Modal>
			<label style={modalLabel}>Cartão CNPJ <Icon type="help" size={18} color='#F7BA00' onClick={() => setModalCNPJ(true)} /></label>
		</div>
	);

}
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
				sendToBackend={() => new Promise((res, rej) => res('Ok'))}
				inputs={[
					<FormInput name='email' label='Email' LabelComponent={<CnpjText />} input={
						<InputEmail
							value={email}
							setValue={setEmail}
							placeholder='Seu email'
						/>
					} />
				]}
			/>
		</div>
	)
}