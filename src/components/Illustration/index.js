import React from 'react'
import PropTypes from 'prop-types'
import { PaymentSuccess } from '../../Illustrations/PaymentSuccess/index'
import { PaymentError } from '../../Illustrations/PaymentError/index'

const Illustration = ({ type, size }) => {
	const illustrationProps = { size }
	const illustrationList = {
		paymentSuccess: <PaymentSuccess {...illustrationProps} />,
		paymentError: <PaymentError {...illustrationProps} />
	}
	return illustrationList[type]
}

Illustration.propTypes = {
	type: PropTypes.string.isRequired,
	size: PropTypes.number
}

export default Illustration