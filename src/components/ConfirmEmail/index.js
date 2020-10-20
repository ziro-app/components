import React from 'react'
import { useLocation } from 'wouter'
import Illustration from '../Illustration/index'
import Button from '../Button/index'
import { successColor } from '@ziro/theme'
import { container, custom, blockOne, blockTwo, btnWhite } from './styles'
import { containerWithPadding } from '@ziro/theme'
import TooltipHelp from '../TooltipHelp'

const message = (
		<>
			Para sua segurança, seu acesso só será liberado após a confirmação do email.
			Procure na sua caixa de entrada e na <strong>caixa de Spam</strong>. Caso não encontre,
			fale com nosso suporte.
		</>
)

const ConfirmEmail = () => {
	const [, setLocation] = useLocation()
	return (
		<div style={containerWithPadding}>
			<div style={container}>
				<div style={{ display: 'grid', justifyItems: 'center' }}><Illustration type='registerSuccess' size={125} /></div>
				<div style={custom(18, successColor)}>Cadastro feito com sucesso!</div>
				<div style={blockOne}>
					<label>Email de confirmação enviado</label>
					<p>
						Clique no link recebido para liberar seu login
						<TooltipHelp
                illustration='security'
								body={message}
								supportButton
            />
					</p>
				</div>
				<div style={blockTwo}>
					<Button type='link' cta='Link acessado, fazer login'
						navigate={() => setLocation('/login')}
					/>
					<Button type='link' cta='Não recebi o email' style={btnWhite}
						navigate={() => setLocation('/reenviar-email')}
					/>
				</div>
			</div>
		</div>
	)
}

export default ConfirmEmail