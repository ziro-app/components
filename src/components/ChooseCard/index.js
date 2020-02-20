import React, { useState, useEffect } from 'react'
import { matchCreditCardBrand } from '../Checkout/utils/matchCreditCardBrand'
import Icon from '../Icon'
import Button from '../Button'
import { cardContainer, color } from './styles'

const ChooseCard = ({ numbers, onChange, onNewCard }) => {

    const [selected, setSelected] = useState(null)

    useEffect(() => onChange && onChange(numbers[selected]),[selected])

    return (
        <div style={{ display: 'grid', gridGap: '20px' }}>
            {
                numbers &&
                numbers.map((number,index) => {
                    const brand = matchCreditCardBrand(number)
                    return (
                        <div onClick={() => setSelected(index)} style={cardContainer(selected===index)}>
                            { brand ? <Icon type={brand} size={30} color={color(selected===index)}/> : <div style={{ width: 30, height: 30 }}/> }
                            <h1 style={{ color: color(selected===index) }}>{number}</h1>
                        </div>
                    )
                })
            }
            <Button
                type='click'
                click={() => onNewCard && onNewCard()}
                cta='Novo Cartão'
            />
        </div>
    )
}

export default ChooseCard