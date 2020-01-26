import React from 'react'
import { useLocation } from 'wouter'
import Header from '../Header/index'
import Button from '../Button/index'
import { container, btnWhite } from './styles'
import { containerWithPadding } from '../../Theme/variables'

const LoginTrouble = () => {
	const [, setLocation] = useLocation()
	return (
		<div style={containerWithPadding}>
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
		</div>
	)
}

export default LoginTrouble