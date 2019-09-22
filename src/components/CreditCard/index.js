import React, { useState, useCallback }  from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'
import { card, brand, chip, cardnumber, info, header } from './styles'

const CreditCard = ({ number }) => {
	const [cardWidth, setCardWidth] = useState(0)
	const cardBox = useCallback(htmlNode => {
		if (htmlNode) setCardWidth(htmlNode.getBoundingClientRect().width)
	}, [])
	return (
		<div style={card(cardWidth)} ref={cardBox}>
			<div style={brand}><Icon type='mastercard' /></div>
			<div style={chip}></div>
			<label style={cardnumber}>
				<span>{number ? number.substring(0,4) : '1234'}</span>
				<span>{number ? number.substring(4,8) : '1234'}</span>
				<span>{number ? number.substring(8,12) : '1234'}</span>
				<span>{number ? number.substring(12,16) : '1234'}</span>
			</label>
			<div style={info}>
				<label style={header}>Vitor A Barbosa</label>
				<label style={header}>11/24</label>
				<label style={header}>111</label>
			</div>
		</div>
	)
}

CreditCard.propTypes = {
	number: PropTypes.string.isRequired
}

export default CreditCard