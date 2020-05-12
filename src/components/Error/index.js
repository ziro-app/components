import React from 'react'
import PropTypes from 'prop-types'
import Illustration from '../Illustration/index'
import Button from '../Button/index'
import { containerWithPadding } from '@ziro/theme'
import { container, svg, header } from './styles'

const Error = ({ type, title, message, btnMsg, backRoute = '/', backRouteFunction, style }) => {
	return (
		<div style={style || { ...containerWithPadding, ...container }}>
			<div style={svg}>
				<Illustration type={type || 'errorLoading'} />
			</div>
			<label style={header}>{title || 'Ocorreu um erro'}</label>
			<label>{message || 'Tente novamente ou contate suporte'}</label>
			<Button type='button' cta={btnMsg || 'Retornar'} click={backRouteFunction ? () => backRouteFunction(backRoute) : () => window.location.assign(backRoute)} />
		</div>
	)
}

Error.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
	message: PropTypes.string,
	btnMsg: PropTypes.string,
	backRoute: PropTypes.string,
	backRouteFunction: PropTypes.func,
	style: PropTypes.object
}

export default Error