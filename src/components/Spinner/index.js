import React from 'react'
import PropTypes from 'prop-types'
import { svg } from './styles'
import { primaryColor, grayColor2 } from '@ziro/theme'

const Spinner = ({ size = '7rem', style = svg }) =>
	<svg style={style} width={size} height={size} viewBox='0 0 24 24' strokeWidth='3' strokeLinecap='round'>
		<style>{`
			@keyframes spin {
  				0% { transform: rotate(0deg) }
  				100% { transform: rotate(359.99deg) }
			}
		`}</style>
		<circle cx='12' cy='12' r='5.5' fill='none' stroke={grayColor2}></circle>
		<circle cx='12' cy='12' r='5.5' fill='none' stroke={primaryColor} strokeDasharray='12 32'></circle>
	</svg>

Spinner.propTypes = {
	size: PropTypes.string,
	style: PropTypes.object
}

export default Spinner