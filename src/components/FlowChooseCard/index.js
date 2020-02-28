import React from 'react'
import PropTypes from 'prop-types'
import ChooseCard from '../ChooseCard'
import FlowManager, { useAnimatedLocation } from '../FlowManager'
import { useState } from 'react'

const FlowChooseCard = ({ numbers, newCard, next, previous, onError }) => {

    const [onNext, onPrevious, onDiverge, onConverge, controls] = useAnimatedLocation(onError)
    const [number, setNumber] = useState()

    const state = { number }

    return (
        <FlowManager
            title='Escolha um cartão'
            controls={controls}
            next={() => onNext(next.onClick && next.onClick(state), next.location)}
            previous={() => onPrevious(previous.onClick && previous.onClick(state), previous.location)}
            onError={onError}
        >
            <ChooseCard
                numbers={numbers}
                onChange={setNumber}
                newCard={() => onDiverge(newCard.onClick && newCard.onClick(), newCard.location)}
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