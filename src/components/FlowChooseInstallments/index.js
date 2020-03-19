import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Modal from '../FlowModal'
import ChooseInstallment from '../ChooseInstallment'
import { useAnimatedLocation, useHeader, useFooter, useModal } from '../FlowManager'
import Header from '../HeaderFlow'
import BottomFlowButtons from '../BottomFlowButtons'
import * as Errors from './errors'
import { useMemo } from 'react'

const FlowChooseInstallments = ({ charge, maxInstallments, seller, cardNumber, next, previous }) => {

    useHeader(<Header title='Finalizar' />)

    const [error, setError] = useState()
    const [installments, setInstallments] = useState()

    const setLocation = useAnimatedLocation()[1]

    const state = useMemo(() => ({ installments }), [installments])

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

    useFooter(<BottomFlowButtons next={onNext} nextTitle='finalizar' previous={onPrevious} />,[onNext, onPrevious])

    useModal(
        <Modal
            isOpen={!!error}
            errorTitle={error && Errors[error].title}
            errorMessage={error && Errors[error].message}
            onRequestClose={() => setError()}
        />
    ,[error])

    return (
        <ChooseInstallment
            charge={charge}
            maxInstallments={maxInstallments}
            seller={seller}
            cardNumber={cardNumber}
            installments={installments}
            setInstallments={setInstallments}
        />
    )
}


export default FlowChooseInstallments