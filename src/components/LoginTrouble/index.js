import React from 'react'
import Button from '../Button/index'
import { container, blockOne, blockTwo, btnWhite } from './styles'

const LoginTrouble = () =>
	<div style={container}>
		<div style={blockOne}>
			<label>Escolha a opção desejada</label>
		</div>
		<div style={blockTwo}>
			<Button type='link' cta='Reenviar confirmação'
				navigate={() => window.location.assign('/confirmar-email')}
			/>
			<Button type='link' cta='Resetar senha' style={btnWhite}
				navigate={() => window.location.assign('/resetar-senha')}
			/>
		</div>
	</div>

export default LoginTrouble