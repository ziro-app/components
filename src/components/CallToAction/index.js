import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import HeaderHome from '../HeaderHome/index'
import { container, header, content, pill, call, btn } from './styles'

const CallToAction = ({ headerText, headerLinkPath, headerLinkClick, pillText, ctaText, btnPath, btnClick, btnText }) =>
	<div style={container}>
		<HeaderHome
			linkText={headerText}
			linkPath={headerLinkPath}
			linkClick={headerLinkClick}
			css={header}
			whiteText={true}
		/>
		<div style={content}>
			<span style={pill}>{pillText}</span>
			<div style={call}>{ctaText}</div>
			<Link to={btnPath} onClick={btnClick}>
				<a style={btn}>{btnText}</a>
			</Link>
		</div>
	</div>

CallToAction.propTypes = {
	/** Propriedade que se refere ao texto apresentado em cima. */
	headerText: PropTypes.string,
	/** Propriedade que define o link de redirecionamento ao clicar no texto em cima. */
	headerLinkPath: PropTypes.string,
	/** Função para o redirecionamento. */
	headerLinkClick: PropTypes.func,
	/** Propriedade que se refere ao texto que possui cor de fundo em destaque. */
	pillText: PropTypes.string,
	/** Propriedade que se refere ao texto de slogan. */
	ctaText: PropTypes.string,
	/** Propriedade que define o link de redirecionamento ao pressionar o botão. */
	btnPath: PropTypes.string,
	/** Função de click para o botão. */
	btnClick: PropTypes.func,
	/** Propriedade que define o texto do botão. */
	btnText: PropTypes.string
}

export default CallToAction