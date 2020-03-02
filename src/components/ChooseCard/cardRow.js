import React from 'react'
import PropTypes from 'prop-types'
import { matchCreditCardBrand } from '../Checkout/utils/matchCreditCardBrand'
import { BrandIcon } from './brandIcon'
import { cardContainer, separator, cardNumber } from './styles'

const _CardRow = ({ number, isSelected, setSelected }) => {

    const brand = matchCreditCardBrand(number)

    return (
        <>
            <div onClick={setSelected} style={cardContainer(isSelected)}>
                <BrandIcon brand={brand}/>
                <h2 style={cardNumber}>{number}</h2>
            </div>
            <div style={separator}/>
        </>
    )
}

_CardRow.propTypes = {
    number: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,
}

export const CardRow = React.memo(_CardRow)