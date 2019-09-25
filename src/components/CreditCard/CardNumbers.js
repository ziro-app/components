import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const CardNumbers = ({ number, brand }) => {
	if (brand === 'amex') {
		return (
			<Fragment>
				<span>{number ? number.substring(0,4) : '1234'}</span>
				<span>{number ? number.substring(4,10) : '123456'}</span>
				<span>{number ? number.substring(10,15) : '12345'}</span>
			</Fragment>
		)
	}
	if (brand === 'visa') {
		return (
			<Fragment>
				<span>{number ? number.substring(0,4) : '1234'}</span>
				<span>{number ? number.substring(4,8) : '1234'}</span>
				<span>{number ? number.substring(8,12) : '1234'}</span>
				<span>{number ? number.substring(12,19) : '1234567'}</span>
			</Fragment>
		)
	}
	if (brand === 'mastercard') {
		return (
			<Fragment>
				<span>{number ? number.substring(0,4) : '1234'}</span>
				<span>{number ? number.substring(4,8) : '1234'}</span>
				<span>{number ? number.substring(8,12) : '1234'}</span>
				<span>{number ? number.substring(12,19) : '1234567'}</span>
			</Fragment>
		)
	}
	return (
		<Fragment>
			<span>{number ? number.substring(0,4) : '1234'}</span>
			<span>{number ? number.substring(4,8) : '1234'}</span>
			<span>{number ? number.substring(8,12) : '1234'}</span>
			<span>{number ? number.substring(12,16) : '1234'}</span>
		</Fragment>
	)
}

CardNumbers.propTypes = {
	number: PropTypes.string.isRequired,
	brand: PropTypes.string.isRequired
}