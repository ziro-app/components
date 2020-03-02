import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Modal from '../FlowModal'
import ChooseInstallment from '../ChooseInstallment'
import FlowManager, { useAnimatedLocation } from '../FlowManager'
import * as Errors from './errors'

const FlowChooseInstallment = ({ charge, maxInstallments, seller, cardNumber, next, previous }) => {

    const [error, setError] = useState()

    const { onNext, onPrevious, controls } = useAnimatedLocation(setError)

    const [installments, setInstallments] = useState()

    const state = { installments }

    const _onNext = useCallback(() => {
        const nextOnClick = async () => {
            if(!installments) throw 'NO_INSTALLMENTS'
            next.onClick && await next.onClick(state)
        }
        onNext(nextOnClick, next.location)
    },[next, installments, onNext, state])

    const _onPrevious = useCallback(() => {
        const previousOnClick = async () => {
            previous.onClick && await previous.onClick(state)
        }
        onPrevious(previousOnClick, previous.location)
    },[previous, onPrevious, state])

    return (
        <>
            <FlowManager
                title='Finalizar'
                controls={controls}
                next={_onNext}
                nextTitle={'finalizar'}
                previous={_onPrevious}
            >
                <ChooseInstallment
                    charge={charge}
                    maxInstallments={maxInstallments}
                    seller={seller}
                    cardNumber={cardNumber}
                    installments={installments}
                    setInstallments={setInstallments}
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


export default FlowChooseInstallment