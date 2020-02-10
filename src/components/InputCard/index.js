import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import Button from '../Button'
import { matchCreditCardBrand } from '../RegisterCard/utils/matchCreditCardBrand'
import { cardsContainer, cardRow } from './styles'

const InputCard = ({ cardNumbers, onChange, newCard }) => {

    const [brands] = useState(() => cardNumbers.map((value) => matchCreditCardBrand(value)||null))

    return (
        <>
        <div style={cardsContainer}>
            {
                cardNumbers.map((value,index) => (
                    <div style={cardRow}>
                        <input type='radio' id={'radio'+index} name='card' value={value} onChange={() => onChange(value)}/>
                        { brands[index] ? <Icon type={brands[index]} size={30}/> : <div style={{ width: 30, height: 30 }}/> }
                        <label htmlFor={'radio'+index}>{value}</label>
                    </div>
                ))
            }
        </div>
        <Button
            type="formClick"
            cta="Cadastrar novo cartão"
            click={() => newCard ? newCard() : null}
        />
        </>
    )
}

InputCard.propTypes = {
    cardNumbers: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    newCard: PropTypes.func.isRequired,
}

export default InputCard