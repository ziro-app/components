import React from 'react'
import PropTypes from 'prop-types'
import { PaymentSuccess } from '../../Illustrations/PaymentSuccess/index'
import { PaymentError } from '../../Illustrations/PaymentError/index'
import { ErrorLoading } from '../../Illustrations/ErrorLoading/index'
import { NotFound } from '../../Illustrations/NotFound/index'
import { TimelineStart } from '../../Illustrations/TimelineStart/index'
import { ProfileData } from '../../Illustrations/ProfileData/index'
import { Buy } from '../../Illustrations/Buy'
import { RegisterSuccess } from '../../Illustrations/RegisterSuccess'

const Illustration = ({ type, size }) => {
	const illustrationProps = { size }
	const illustrationList = {
		paymentSuccess: <PaymentSuccess {...illustrationProps} />,
		paymentError: <PaymentError {...illustrationProps} />,
		errorLoading: <ErrorLoading {...illustrationProps} />,
		notFound: <NotFound {...illustrationProps} />,
		timelineStart: <TimelineStart {...illustrationProps} />,
		profileData: <ProfileData {...illustrationProps} />,
		buy: <Buy {...illustrationProps} />,
		registerSuccess: <RegisterSuccess {...illustrationProps} />
	}
	return illustrationList[type]
}

Illustration.propTypes = {
	type: PropTypes.string.isRequired,
	size: PropTypes.number
}

export default Illustration