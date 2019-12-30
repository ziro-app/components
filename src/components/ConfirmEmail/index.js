import React from 'react'
import Proptypes from 'prop-types'
import Button from '../Button/index'
import { container } from './styles'

const ConfirmEmail = ({ email }) => {
	return (
		<div style={container}>
			<label>Email de confirmação enviado para:</label>
			<label>{email}</label>
			<label>Clique no link recebido para acessar o app</label>
			<Button type='link' cta='Já acessei o link' />
			<Button type='link' cta='Reenviar email' />
		</div>
	)
}

ConfirmEmail.propTypes = {
	email: Proptypes.string.isRequired
}

export default ConfirmEmail