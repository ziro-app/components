import React, { useState, useEffect } from 'react'
import { matchCreditCardBrand } from '../Checkout/utils/matchCreditCardBrand'
import Icon from '../Icon'
import { cardContainer, color } from './styles'
import { motion } from 'framer-motion'

const ChooseCard = ({ numbers, onChange, newCard }) => {

    const [selected, setSelected] = useState(null)

    useEffect(() => onChange && onChange(numbers[selected]),[selected])

    return (
        <div style={{ display: 'grid', alignItems: 'start', height: '100%', alignContent: 'start', padding: '10px 0px' }}>
            {
                numbers &&
                numbers.map((number,index) => {
                    const brand = matchCreditCardBrand(number)
                    return (
                        [
                            <div onClick={() => setSelected(index)} style={cardContainer(selected===index)}>
                                { brand ? <Icon type={brand} size={30} color={color}/> : <div style={{ width: 30, height: 30 }}/> }
                                <h2 style={{ color }}>{number}</h2>
                            </div>,
                            <div style={{ background: '#e0e0e0', height: '1px', margin: '0px 50px' }}/>
                        ]

                    )
                })
            }
             <motion.div
                onClick={newCard}
                style={cardContainer(false)}
                whileTap={{ scale: 0.95 }}
            >
                <Icon type='add' size={30} color={'grey'}/>
                <h2 style={{ color: 'grey' }}>Adcionar novo cartão</h2>
            </motion.div>
        </div>
    )
}

export default ChooseCard