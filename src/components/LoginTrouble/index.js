import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'wouter'
import Header from '../Header/index'
import Button from '../Button/index'
import { container, btnWhite } from './styles'
import { containerWithPadding } from '@ziro/theme'

const LoginTrouble = ({ navigateTo = '/' }) => {
	const [, setLocation] = useLocation()
	return (
		<div style={containerWithPadding}>
			<Header type='icon-link' icon='back' navigateTo={navigateTo} title='Corrigir acesso' />
			<div style={container}>
				<label>Escolha a opção desejada</label>
				<Button type='link' cta='Reenviar confirmação'
					navigate={() => setLocation('/reenviar-email')}
				/>
				<Button type='link' cta='Resetar senha'
					navigate={() => setLocation('/resetar-senha')}
				/>
				<Button type='link' cta='Falar com suporte' style={btnWhite}
					navigate={() => setLocation('/pagina-suporte')}
				/>
			</div>
		</div>
	)
}

LoginTrouble.propTypes = {
	navigateTo: PropTypes.string
}

export default LoginTrouble