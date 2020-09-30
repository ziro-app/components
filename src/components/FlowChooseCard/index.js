import React, { useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import ChooseCard from '../ChooseCard'
import { CardRow } from "../ChooseCard/CardRow";
import { useCache, useHeader, useFooter, useModal, useAnimatedLocation } from '../FlowManager'
import Modal from '../FlowModal'
import Header from '../HeaderFlow'
import BottomFlowButtons from '../BottomFlowButtons'
import * as Errors from './errors'

const FlowChooseCard = ({ numbers, newCard, next, previous }) => {

    const setLocation = useAnimatedLocation()[1]

    const [selected, setSelected] = useState()
    const [error, setError] = useState()

    const state = useMemo(() => ({ number: numbers[selected] }),[selected, numbers])

    const onNext = useCallback(() => {
        if(next.onClick) next.onClick(state)
            .then(() => next.location && setLocation('goLeft', next.location))
            .catch(setError)
        else next.location && setLocation('goLeft', next.location)
    },[next, state])

    const onPrevious = useCallback(() => {
        if(previous.onClick) previous.onClick(state)
            .then(() => previous.location && setLocation('goRight', previous.location))
            .catch(setError)
        else previous.location && setLocation('goRight', previous.location)
    },[previous, state])

    const onNewCard = useCallback(() => {
        if(newCard.onClick) newCard.onClick(state)
            .then(() => newCard.location && setLocation('diverge', newCard.location))
            .catch(setError)
        else newCard.location && setLocation('diverge', newCard.location)
    },[newCard, state])

    useHeader(
        <>
            <Header title='Escolha um cartão'/>
            <div style={{ margin: '10px', padding: '5px 10px 0px 10px', border: 'grey dashed 2px', borderRadius: 10 }}>
                {
                    state.number ?
                    <CardRow number={state.number||''} isSelected={false} setSelected={() => {}}/>
                    :
                    <div style={{ display: 'grid', alignItems: 'center', height: '60px', textAlign: 'center', margin: '5px 0px 10px 0px' }}>
                        <label>Nenhum cartão escolhido</label>
                    </div>
                }
            </div>
        </>
    ,[state])

    useFooter(<BottomFlowButtons next={onNext} previous={onPrevious} />, [onNext, onPrevious])

    useModal(
        <Modal
            isOpen={!!error}
            errorTitle={error && Errors[error].title}
            errorMessage={error && Errors[error].message}
            onRequestClose={() => setError()}
        />
    ,[error])

    return (
        <ChooseCard
            numbers={numbers}
            selected={selected}
            setSelected={setSelected}
            newCard={onNewCard}
        />
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