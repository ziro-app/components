import React from 'react'
import PropTypes from 'prop-types'
import { PaymentSuccess } from '../../Illustrations/PaymentSuccess/index'
import { PaymentError } from '../../Illustrations/PaymentError/index'
import { ErrorLoading } from '../../Illustrations/ErrorLoading/index'

const Illustration = ({ type, size }) => {
	const illustrationProps = { size }
	const illustrationList = {
		paymentSuccess: <PaymentSuccess {...illustrationProps} />,
		paymentError: <PaymentError {...illustrationProps} />,
		errorLoading: <ErrorLoading {...illustrationProps} />
	}
	return illustrationList[type]
}

Illustration.propTypes = {
	type: PropTypes.string.isRequired,
	size: PropTypes.number
}

export default Illustration