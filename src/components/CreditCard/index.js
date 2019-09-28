import React, { useState, useCallback }  from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'
import { CardNumbers } from './CardNumbers'
import { card, brandLogo, chip, cardnumber, info, header } from './styles'

const CreditCard = ({ number, brand, cardholder, expiry, cvv }) => {
	const [cardWidth, setCardWidth] = useState(0)
	const cardBox = useCallback(htmlNode => {
		if (htmlNode) setCardWidth(htmlNode.getBoundingClientRect().width)
	}, [])
	return (
		<div style={card(cardWidth)} ref={cardBox}>
			<div style={brandLogo}>{brand && <Icon type={brand} />}</div>
			<div style={chip}></div>
			<label style={cardnumber}>
				<CardNumbers number={number} brand={brand} />
			</label>
			<div style={info}>
				<label style={header}>{cardholder || 'titular do cartão'}</label>
				<label style={header}>{expiry || '**/**'}</label>
			</div>
		</div>
	)
}

CreditCard.propTypes = {
	number: PropTypes.string.isRequired,
	brand: PropTypes.string.isRequired,
	cardholder: PropTypes.string.isRequired,
	expiry: PropTypes.string.isRequired,
	cvv: PropTypes.string.isRequired
}

export default CreditCard