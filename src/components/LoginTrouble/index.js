import React from 'react'
import Header from '../Header/index'
import Button from '../Button/index'
import { container, btnWhite } from './styles'

const LoginTrouble = () =>
	<>
		<Header type='icon-link' icon='back' navigateTo='/' title='Reenviar confirmação' />
		<div style={container}>
			<label>Escolha a opção desejada</label>
			<Button type='link' cta='Reenviar confirmação'
				navigate={() => window.location.assign('/confirmar-email')}
			/>
			<Button type='link' cta='Resetar senha' style={btnWhite}
				navigate={() => window.location.assign('/resetar-senha')}
			/>
		</div>
	</>

export default LoginTrouble