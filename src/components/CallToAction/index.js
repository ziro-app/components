import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import { container, header, login, content, pill, call, btn } from './styles'

const CallToAction = ({ headerText, headerLinkPath, headerLinkText, pillText, ctaText, btnPath, btnText }) =>
	<div style={container}>
		<div style={header}>
			{headerText}
			<Link style={login} to={headerLinkPath}>
				{headerLinkText}
			</Link></div>
		<div style={content}>
			<span style={pill}>{pillText}</span>
			<div style={call}>{ctaText}</div>
			<Link style={btn} to={btnPath}>{btnText}</Link>
		</div>
	</div>

CallToAction.propTypes = {
	headerText: PropTypes.string,
	headerLinkPath: PropTypes.string,
	headerLinkText: PropTypes.string,
	pillText: PropTypes.string,
	ctaText: PropTypes.string,
	btnPath: PropTypes.string,
	btnText: PropTypes.string
}

export default CallToAction