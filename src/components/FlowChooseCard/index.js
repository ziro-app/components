import React from 'react'
import PropTypes from 'prop-types'
import ChooseCard from '../ChooseCard'
import FlowManager, { useAnimatedLocation } from '../FlowManager'

const FlowChooseCard = ({ numbers, onChange, newCard, next, previous, onError }) => {

    const [onNext, onPrevious, onDiverge, onConverge, controls] = useAnimatedLocation(onError)

    return (
        <FlowManager
            title='Escolha um cartão'
            controls={controls}
            next={() => onNext(next.onClick, next.location)}
            previous={() => onPrevious(previous.onClick, previous.location)}
            onError={onError}
        >
            <ChooseCard
                numbers={numbers}
                onChange={onChange}
                newCard={() => {
                    console.log('clicked')
                    onDiverge(newCard.onClick, newCard.location)
                }}
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