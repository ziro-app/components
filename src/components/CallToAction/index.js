import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
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
	headerText: PropTypes.string,
	headerLinkPath: PropTypes.string,
	headerLinkClick: PropTypes.func,
	pillText: PropTypes.string,
	ctaText: PropTypes.string,
	btnPath: PropTypes.string,
	btnClick: PropTypes.func,
	btnText: PropTypes.string
}

export default CallToAction