import React from 'react'
import PropTypes from 'prop-types'
import Error from '../Error/index'

const NotFound = ({ fallback }) =>
	<Error
		type='notFound'
		title='Página não existe'
		message='Retorne à pagina inicial para continuar navegando'
		backRoute={fallback}
	/>

NotFound.propTypes = {
	/** Rota na qual será feito o redirecionamento. */
	fallback: PropTypes.string
}

export default NotFound