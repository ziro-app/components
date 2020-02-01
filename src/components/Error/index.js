import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'wouter'
import Illustration from '../Illustration/index'
import Button from '../Button/index'
import { containerWithPadding } from '@ziro/theme'
import { container, svg, header } from './styles'

const Error = ({ type, title, message, btnMsg, backRoute, style }) => {
	// Unused function
	const [, setLocation] = useLocation()
	return (
		<div style={style || { ...containerWithPadding, ...container }}>
			<div style={svg}>
				<Illustration type={type || 'errorLoading'} />
			</div>
			<label style={header}>{title || 'Ocorreu um erro'}</label>
			<label>{message || 'Tente novamente ou contate suporte'}</label>
			<Button type='click' cta={btnMsg || 'Retornar'} click={() => window.location.assign('/')} />
		</div>
	)
}

Error.propTypes = {
	/** Propriedade que define o tipo do erro. */
	type: PropTypes.string,
	/** Propriedade que define o título do erro */
	title: PropTypes.string,
	/** Propriedade que define a mensagem de erro */
	message: PropTypes.string,
	/** Propriedade que define o texto da mensagem no botão */
	btnMsg: PropTypes.string,
	/** Propriedade que define a rota de retorno */
	backRoute: PropTypes.string,
	/** Objeto que define o estilo do componente. */
	style: PropTypes.object
}

export default Error