import React, { useState } from 'react'
import Proptypes from 'prop-types'
import Badge from '../Badge/index'
import Button from '../Button/index'
import { successColor } from '../../Theme/variables'
import { container, custom, blockOne, blockTwo } from './styles'

const ConfirmEmail = ({ email }) => {
	const [submitting, setSubmitting] = useState(false)
	return (
		<div style={container}>
			<Badge
				type='success'
				style={custom(18, successColor)}
				size={21}
				color={successColor}
				message='Cadastro feito com sucesso!'
			/>
			<div style={blockOne}>
				<label>Email de confirmação enviado para:</label>
				<label><strong>{email}</strong></label>
				<label>Clique no link recebido para acessar o app</label>
				<label>Apenas após confirmação o login será liberado</label>
			</div>
			<div style={blockTwo}>
				<Button type='link' cta='Já acessei o link' />
				<Button type='link' cta='Reenviar email' submitting={submitting} />
			</div>
		</div>
	)
}

ConfirmEmail.propTypes = {
	email: Proptypes.string.isRequired
}

export default ConfirmEmail