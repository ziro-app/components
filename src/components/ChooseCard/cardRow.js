import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { matchCreditCardBrand } from '../Checkout/utils/matchCreditCardBrand'
import { BrandIcon } from './brandIcon'
import { cardContainer, cardNumber } from './styles'
import { useMemo } from 'react'

const _CardRow = ({ number, isSelected, setSelected }) => {

    const brand = matchCreditCardBrand(number)

    return (
        <motion.div
            initial={{ scaleY: 1, height: 70, opacity: 1 }}
            animate={
                isSelected ?
                { scaleY: 0, height: 0, opacity: 0 }
                :
                { scaleY: 1, height: 70, opacity: 1 }
            }
            onClick={setSelected}
        >
            <div style={cardContainer}>
                <BrandIcon brand={brand}/>
                <h2 style={cardNumber}>{number}</h2>
            </div>
        </motion.div>
    )
}

_CardRow.propTypes = {
    number: PropTypes.string.isRequired,
    setSelected: PropTypes.func,
    isSelected: PropTypes.bool,
}

export const CardRow = React.memo(_CardRow)