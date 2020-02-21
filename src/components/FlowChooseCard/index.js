import React from 'react'
import PropTypes from 'prop-types'
import ChooseCard from '../ChooseCard'
import FlowManager from '../FlowManager'

const FlowChooseCard = ({ numbers, onChange, onNewCard, next, previous, onError }) => {
    return (
        <FlowManager
            title='Escolha um cartão'
            next={{
                title: 'próximo',
                ...next
            }}
            previous={{
                title: 'voltar',
                ...previous
            }}
            onError={onError}
        >
            <ChooseCard
                numbers={numbers}
                onChange={onChange}
                onNewCard={onNewCard}
            />
        </FlowManager>
    )
}

FlowChooseCard.propTypes = {
    ...ChooseCard.propTypes,
    next: PropTypes.shape({
        onClick: PropTypes.func,
        location: PropTypes.string
    }).isRequired,
    previous: PropTypes.shape({
        onClick: PropTypes.func,
        location: PropTypes.string
    }).isRequired,
    onError: PropTypes.func
}

export default FlowChooseCard