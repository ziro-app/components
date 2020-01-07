import React from 'react'
import PropTypes from 'prop-types'
import Error from '../Error/index'
import { containerWithPadding } from '../../Theme/variables'
import { container } from './styles'

const NotFound = ({ fallback }) =>
	<Error
		type='notFound'
		title='Página não existe'
		message='Retorne à pagina inicial para continuar navegando'
		backRoute={fallback}
		style={{...containerWithPadding, ...container}}
	/>

NotFound.propTypes = {
	fallback: PropTypes.string
}

export default NotFound