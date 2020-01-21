import React from 'react'
import { useLocation } from 'wouter'
import Header from '../Header/index'
import Button from '../Button/index'
import { container, btnWhite } from './styles'

const LoginTrouble = () => {
	const [, setLocation] = useLocation()
	return (
		<>
			<Header type='icon-link' icon='back' navigateTo='/' title='Corrigir acesso' />
			<div style={container}>
				<label>Escolha a opção desejada</label>
				<Button type='link' cta='Reenviar confirmação'
					navigate={() => setLocation('/reenviar-email')}
				/>
				<Button type='link' cta='Resetar senha' style={btnWhite}
					navigate={() => setLocation('/resetar-senha')}
				/>
			</div>
		</>
	)
}

export default LoginTrouble