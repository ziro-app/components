import React from 'react'
import PropTypes from 'prop-types'
import ChooseInstallment from '../ChooseInstallment'
import FlowManager, { useAnimatedLocation } from '../FlowManager'
import { useState } from 'react'

const FlowChooseInstallment = ({ charge, maxInstallments, seller, cardNumber, next, previous, onError }) => {

    const [onNext, onPrevious, onDiverge, onConverge, controls] = useAnimatedLocation(onError)

    const [installments, setInstallments] = useState()

    const state = { installments }

    return (
        <FlowManager
            title='Finalizar'
            controls={controls}
            next={() => onNext(next.onClick && next.onClick(state), next.location)}
            nextTitle='finalizar'
            previous={() => onPrevious(previous.onClick && previous.onClick(state), previous.location)}
            onError={onError}
            contentOverflow={'visible'}
        >
            <ChooseInstallment
                charge={charge}
                maxInstallments={maxInstallments}
                seller={seller}
                cardNumber={cardNumber}
                onChange={setInstallments}
            />
        </FlowManager>
    )
}

FlowChooseInstallment.propTypes = {
    ...ChooseInstallment.propTypes,
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

export default FlowChooseInstallment