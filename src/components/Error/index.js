import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'wouter'
import Illustration from '../Illustration/index'
import Button from '../Button/index'
import { containerWithPadding } from '../../Theme/variables'
import { container, svg, header } from './styles'

const Error = ({ type, title, message, btnMsg, backRoute, style }) => {
	const [, setLocation] = useLocation()
	return (
		<div style={style || {...containerWithPadding ,...container}}>
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
	type: PropTypes.string,
	title: PropTypes.string,
	message: PropTypes.string,
	btnMsg: PropTypes.string,
	backRoute: PropTypes.string,
	style: PropTypes.object
}

export default Error