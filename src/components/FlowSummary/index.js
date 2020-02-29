import React from 'react'
import PropTypes from 'prop-types'
import Summary from '../Summary'
import FlowManager, { useAnimatedLocation } from '../FlowManager'

const FlowSummary = ({ seller, charge, maxInstallments, misc, next, onError }) => {

    const [onNext, onPrevious, onDiverge, onConverge, controls] = useAnimatedLocation(onError)

    return (
        <FlowManager
            title='Fatura'
            controls={controls}
            next={() => onNext(next.onClick && next.onClick(), next.location)}
            onError={onError}
        >
            <Summary
                seller={seller}
                charge={charge}
                maxInstallments={maxInstallments}
                misc={misc}
            />
        </FlowManager>
    )
}

FlowSummary.propTypes = {
    ...Summary.propTypes,
    next: PropTypes.shape({
        onClick: PropTypes.func,
        location: PropTypes.string
    }).isRequired,
    onError: PropTypes.func
}

export default FlowSummary