import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { CardRow } from './cardRow'
import { AddCard } from './addCard'
import { container } from './styles'

const ChooseCard = ({ numbers, selected, setSelected, newCard }) => 
    <div style={container}>
        {
            numbers &&
            numbers.map((number,index) => {
                const _setSelected = useCallback(() => setSelected(index), [setSelected, index])
                return <CardRow number={number} isSelected={selected===index} setSelected={_setSelected}/>
            })
        }
            <AddCard onClick={newCard}/>
    </div>

ChooseCard.propsTypes = {
    numbers: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.number,
    setSelected: PropTypes.func,
    newCard: PropTypes.func
}

export default React.memo(ChooseCard)