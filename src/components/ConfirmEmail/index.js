import React from 'react'
import Badge from '../Badge/index'
import Button from '../Button/index'
import { successColor } from '../../Theme/variables'
import { container, custom, blockOne, blockTwo, btnWhite } from './styles'

const ConfirmEmail = () =>
	<div style={container}>
		<Badge
			type='success'
			style={custom(18, successColor)}
			size={21}
			color={successColor}
			message='Cadastro feito com sucesso!'
		/>
		<div style={blockOne}>
			<label>Email de confirmação enviado</label>
			<label>Clique no link recebido para liberar seu login</label>
		</div>
		<div style={blockTwo}>
			<Button type='link' cta='Link acessado, fazer login'
				navigate={() => window.location.assign('/login')}
			/>
			<Button type='link' cta='Não recebi o email' style={btnWhite}
				navigate={() => window.location.assign('/reenviar-email')}
			/>
		</div>
	</div>

export default ConfirmEmail