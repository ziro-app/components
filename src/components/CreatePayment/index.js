import React from 'react'
import PropTypes from 'prop-types'
import { container } from './styles'

const CreatePayment = props => {
	return (
		<form onSubmit={e => e.preventDefault()}>
			<div style={container}>
				
			</div>
		</form>
	)
}

CreatePayment.propTypes = {

}

export default CreatePayment