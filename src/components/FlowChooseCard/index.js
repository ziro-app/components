import React, { useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import ChooseCard from '../ChooseCard'
import FlowManager, { useAnimatedLocation } from '../FlowManager'
import Modal from '../FlowModal'
import * as Errors from './errors'

const FlowChooseCard = ({ numbers, newCard, next, previous }) => {

    const [selected, setSelected] = useState()
    const state = useMemo(() => ({ number: selected && numbers[selected] }),[selected,numbers])

    const [error, setError] = useState()

    const { onNext, onPrevious, onDiverge, controls } = useAnimatedLocation(setError)

    const _onNext = useCallback(() => {
        const nextOnClick = async () => {
            if(!selected) throw 'NO_CARD'
            next.onClick && await next.onClick(state)
        }
        onNext(nextOnClick, next.location)
    },[next, selected, onNext, state])

    const _onPrevious = useCallback(() => {
        const previousOnClick = async () => {
            previous.onClick && await previous.onClick(state)
        }
        onPrevious(previousOnClick, previous.location)
    },[previous, onPrevious, state])

    const _onNewCard = useCallback(() => {
        const newCardOnClick = async () => {
            newCard.onClick && await newCard.onClick(state)
        }
        onDiverge(newCardOnClick, newCard.location)
    },[newCard, onDiverge, state])

    return (
        <>
            <FlowManager
                title='Escolha um cartão'
                controls={controls}
                next={_onNext}
                previous={_onPrevious}
            >
                <ChooseCard
                    numbers={numbers}
                    selected={selected}
                    setSelected={setSelected}
                    newCard={_onNewCard}
                />
            </FlowManager>
            <Modal
                isOpen={!!error}
                errorTitle={error && Errors[error].title}
                errorMessage={error && Errors[error].message}
                onRequestClose={() => setError()}
            />
        </>
    )
}

const locProp = PropTypes.shape({
    onClick: PropTypes.func,
    location: PropTypes.string
})

FlowChooseCard.propTypes = {
    numbers: PropTypes.arrayOf(PropTypes.string).isRequired,
    next: locProp.isRequired,
    previous: locProp.isRequired,
    newCard: locProp.isRequired
}

export default FlowChooseCard