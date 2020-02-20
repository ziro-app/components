import React from 'react'
import PropTypes from 'prop-types'
import ChooseCard from '../ChooseCard'
import FlowButtonsWrapper from '../FlowButtonsWrapper'

const FlowChooseCard = ({ numbers, onChange, onNewCard, onNext, onPrevious }) => {
    return (
        <FlowButtonsWrapper
            title='Escolha um cartão'
            next={{
                title: 'finalizar',
                onClick: onNext
            }}
            previous={{
                title: 'voltar',
                onClick: onPrevious
            }}
        >
            <ChooseCard
                numbers={numbers}
                onChange={onChange}
                onNewCard={onNewCard}
            />
        </FlowButtonsWrapper>
    )
}

FlowChooseCard.propTypes = {
    ...ChooseCard.propTypes,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired
}

export default FlowChooseCard