import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import HeaderHome from '../HeaderHome/index'
import { container, header, content, pill, call, btn } from './styles'

const CallToAction = ({ headerText, headerLinkPath, pillText, ctaText, btnPath, btnText }) =>
	<div style={container}>
		<HeaderHome linkPath={headerLinkPath} linkText={headerText} css={header} whiteText={true} />
		<div style={content}>
			<span style={pill}>{pillText}</span>
			<div style={call}>{ctaText}</div>
			<Link style={btn} to={btnPath}>{btnText}</Link>
		</div>
	</div>

CallToAction.propTypes = {
	headerText: PropTypes.string,
	headerLinkPath: PropTypes.string,
	pillText: PropTypes.string,
	ctaText: PropTypes.string,
	btnPath: PropTypes.string,
	btnText: PropTypes.string
}

export default CallToAction