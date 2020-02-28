import React from 'react'
import PropTypes from 'prop-types'
import ChooseInstallment from '../ChooseInstallment'
import FlowManager, { useAnimatedLocation } from '../FlowManager'

const FlowChooseInstallment = ({ charge, maxInstallments, seller, cardNumber, onChange, next, previous, onError }) => {

    const [onNext, onPrevious, onDiverge, onConverge, controls] = useAnimatedLocation(onError)

    return (
        <FlowManager
            title='Finalizar'
            controls={controls}
            next={() => onNext(next.onClick, next.location)}
            previous={() => onPrevious(previous.onClick, previous.location)}
            onError={onError}
            contentOverflow={'visible'}
        >
            <ChooseInstallment
                charge={charge}
                maxInstallments={maxInstallments}
                seller={seller}
                cardNumber={cardNumber}
                onChange={onChange}
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