import React, { useState } from 'react'
import Proptypes from 'prop-types'
import Badge from '../Badge/index'
import Button from '../Button/index'
import { successColor } from '../../Theme/variables'
import { container, custom, blockOne, blockTwo, btnWhite } from './styles'

const ConfirmEmail = ({ email, auth }) => {
	const [submitting, setSubmitting] = useState(false)
	const [message, setMessage] = useState({ content: '', type: '' })
	const onClick = async () => {
		try {
			setSubmitting(true)
			await auth.currentUser.sendEmailVerification({ url: `${process.env.CONTINUE_URL}` })
			setSubmitting(false)
			setMessage({ content: 'Email reenviado com sucesso!', type: 'success' })
		} catch (error) {
			console.log(error)
			setSubmitting(false)
			setMessage({ content: 'Aguarde alguns instantes para reenviar', type: 'error' })
		}
	}
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
				<Button type='link' cta='Já acessei o link' navigate={() => window.location.replace('/')} />
				<Button type='click' cta='Reenviar email' click={onClick} submitting={submitting} style={btnWhite} />
			</div>
		</div>
	)
}

ConfirmEmail.propTypes = {
	email: Proptypes.string.isRequired,
	auth: Proptypes.object.isRequired
}

export default ConfirmEmail