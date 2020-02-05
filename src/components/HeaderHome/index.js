import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import Logo from '../Logo/index'
import { container, link } from './styles'

const HeaderHome = ({ linkText, linkPath, linkClick = null, css = container, whiteText = false }) =>
	<div style={css}>
		<Logo />
		<Link style={link(whiteText)} to={linkPath} onClick={linkClick}>{linkText}</Link>
	</div>

HeaderHome.propTypes = {
	/** Propriedade que define o texto apresentado no link. */
	linkText: PropTypes.string.isRequired,
	/** Propriedade que define a rota de direcionamento do link. */
	linkPath: PropTypes.string.isRequired,
	/** Função executada ao ser efetuado o click no link. */
	linkClick: PropTypes.func,
	/** Objeto contendo propriedades css para a estilização do componente. */
	css: PropTypes.object,
	/** Propriedade que define se o texto do link terá a cor branca */
	whiteText: PropTypes.bool
}

export default HeaderHome