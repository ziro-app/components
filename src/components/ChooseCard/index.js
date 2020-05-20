import React, { useCallback } from 'react'
import { arrayOf, exact, number, func, string } from 'prop-types'
import { CardRow } from './cardRow'
import { AddCard } from './addCard'
import { container } from './styles'

export { CardRow }

const ChooseCard = ({ cards, selected, onClick, newCard }) => 
    <div style={container}>
        {cards.map((card,index) =>
            <CardRow
                key={index}
                card={card}
                isSelected={selected===index}
                onClick={onClick.bind(null,index)}
            />
        )}
        <AddCard onClick={newCard}/>
    </div>

ChooseCard.propsTypes = {
    cards: arrayOf(exact({ number: string.isRequired, status: string.isRequired })).isRequired,
    selected: number,
    onClick: func,
    newCard: func
}

export default ChooseCard