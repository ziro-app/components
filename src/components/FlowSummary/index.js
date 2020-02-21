import React from 'react'
import PropTypes from 'prop-types'
import Summary from '../Summary'
import FlowManager from '../FlowManager'

const FlowSummary = ({ seller, charge, maxInstallments, misc, next, onError }) => {
    return (
        <FlowManager
            title='Fatura'
            next={{
                title: 'próximo',
                ...next
            }}
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