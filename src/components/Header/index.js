import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import Icon from '../Icon/index'
import { container, svg, text } from './styles'

const Header = ({ type, title, icon, setIsOpen, navigateTo }) => {
	const component = {
		'icon':
			<>
				<Icon type={icon || 'ziro'} style={svg(setIsOpen)} onClick={setIsOpen} />
				<h1 style={text(false)}>{title}</h1>
			</>,
		'icon-link':
			<>
				<Link to={navigateTo}><Icon type={icon || 'ziro'} style={svg(navigateTo)} /></Link>
				<h1 style={text(false)}>{title}</h1>
			</>,
		'title-only': <h1 style={text(true)}>{title}</h1>
	}
	return (
		<div style={container(type === 'title-only')}>
			{component[type]}
		</div>
	)
}

Header.propTypes = {
	/** Propriedade que define o tipo de cabeçalho (icóne, ícone e navegação ou só texto) */
	type: PropTypes.string.isRequired,
	/** Propriedade que define o título do cabeçalho */
	title: PropTypes.string.isRequired,
	/** Propriedade que define o ícone presente no cabeçalho */
	icon: PropTypes.string,
	/** Função que altera o estado do menu (abrir/fechar) */
	setIsOpen: PropTypes.func,
	/** Propriedade que define a rota a ser navegada */
	navigateTo: PropTypes.string
}

export default Header