import React, { useState, useEffect } from 'react'
import { matchCreditCardBrand } from '../Checkout/utils/matchCreditCardBrand'
import Icon from '../Icon'
import Button from '../Button'
import { cardContainer, color } from './styles'

const ChooseCard = ({ numbers, onChange, onNewCard }) => {

    const [selected, setSelected] = useState(null)

    useEffect(() => onChange && onChange(numbers[selected]),[selected])

    return (
        <div style={{ display: 'grid', alignItems: 'center', height: '100%' }}>
            {
                numbers &&
                numbers.map((number,index) => {
                    const brand = matchCreditCardBrand(number)
                    return (
                        <div onClick={() => setSelected(index)} style={cardContainer(selected===index)}>
                            { brand ? <Icon type={brand} size={30} color={color}/> : <div style={{ width: 30, height: 30 }}/> }
                            <h1 style={{ color }}>{number}</h1>
                        </div>
                    )
                })
            }
            <div style={{ padding: '20px 0px' }}>
            <Button
                type='click'
                click={() => onNewCard && onNewCard()}
                cta='Novo Cartão'
            />
            </div>
        </div>
    )
}

export default ChooseCard