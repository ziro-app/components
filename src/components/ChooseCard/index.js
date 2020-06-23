import React, { useCallback } from 'react'
import { arrayOf, shape, number, func, string } from 'prop-types'
import { CardRow } from './cardRow'
import { AddCard } from './addCard'
import { container } from './styles'
import { otherColor } from '@ziro/theme'

export { CardRow }

const ChooseCard = ({ cards, selected, onClick, newCard, onDelete }) => 
    <div style={container}>
        {cards.map((card,index) =>
            <CardRow
                key={index}
                card={card}
                isSelected={selected===index}
                onClick={onClick.bind(null,index)}
                rightButton={{
                    icon: 'trash',
                    color: otherColor,
                    onClick: onDelete.bind(null,index)
                }}
            />
        )}
        <AddCard onClick={newCard}/>
    </div>

ChooseCard.propsTypes = {
    cards: arrayOf(shape({ number: string.isRequired, status: string.isRequired })).isRequired,
    selected: number,
    onClick: func,
    onDelete: func,
    newCard: func
}

export default ChooseCard