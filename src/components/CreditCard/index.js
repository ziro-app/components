import React, { useState, useCallback, Fragment }  from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'
import { card, brandLogo, chip, cardnumber, info, header } from './styles'

const CreditCard = ({ number, brand }) => {
	const [cardWidth, setCardWidth] = useState(0)
	const cardBox = useCallback(htmlNode => {
		if (htmlNode) setCardWidth(htmlNode.getBoundingClientRect().width)
	}, [])
	return (
		<div style={card(cardWidth)} ref={cardBox}>
			<div style={brandLogo}><Icon type={brand} /></div>
			<div style={chip}></div>
			<label style={cardnumber}>
				{brand === 'amex'
				?
					<Fragment>
						<span>{number ? number.substring(0,4) : '1234'}</span>
						<span>{number ? number.substring(4,10) : '123456'}</span>
						<span>{number ? number.substring(10,15) : '12345'}</span>
					</Fragment>
				:
					<Fragment>
						<span>{number ? number.substring(0,4) : '1234'}</span>
						<span>{number ? number.substring(4,8) : '1234'}</span>
						<span>{number ? number.substring(8,12) : '1234'}</span>
						<span>{number ? number.substring(12,16) : '1234'}</span>
					</Fragment>
				}
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
	number: PropTypes.string.isRequired,
	brand: PropTypes.string.isRequired
}

export default CreditCard