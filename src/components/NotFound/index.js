import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'wouter'
import Illustration from '../Illustration/index'
import Button from '../Button/index'
import { containerWithPadding } from '../../Theme/variables'
import { container, svg, title } from './styles'

const NotFound = ({ fallback }) => {
	const [, setLocation] = useLocation()
	return (
		<div style={{...containerWithPadding, ...container}}>
			<div style={svg}><Illustration type='notFound' /></div>
			<label style={title}>Página não existe!</label>
			<label>Retorne à pagina inicial para continuar navegando</label>
			<Button type='link' cta='Retornar' navigate={() => setLocation(fallback)} />
		</div>
	)
}

NotFound.propTypes = {
	fallback: PropTypes.string
}

export default NotFound