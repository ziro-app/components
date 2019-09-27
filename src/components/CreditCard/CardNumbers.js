import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const CardNumbers = ({ number, brand }) => {
	if (brand === 'amex') {
		return (
			<Fragment>
				<span>{number ? number.substring(0,4) : '****'}</span>
				<span>{number ? number.substring(4,10) : '******'}</span>
				<span>{number ? number.substring(10,15) : '*****'}</span>
			</Fragment>
		)
	}
	if (brand === 'visa' || brand === 'mastercard') {
		return (
			<Fragment>
				<span>{number ? number.substring(0,4) : '****'}</span>
				<span>{number ? number.substring(4,8) : '****'}</span>
				<span>{number ? number.substring(8,12) : '****'}</span>
				<span>{number ? number.substring(12,19) : '*******'}</span>
			</Fragment>
		)
	}
	return (
		<Fragment>
			<span>{number ? number.substring(0,4) : '****'}</span>
			<span>{number ? number.substring(4,8) : '****'}</span>
			<span>{number ? number.substring(8,12) : '****'}</span>
			<span>{number ? number.substring(12,16) : '****'}</span>
		</Fragment>
	)
}

CardNumbers.propTypes = {
	number: PropTypes.string.isRequired,
	brand: PropTypes.string.isRequired
}