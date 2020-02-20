import React from 'react'
import PropTypes from 'prop-types'
import Summary from '../Summary'
import FlowButtonsWrapper from '../FlowButtonsWrapper'

const FlowSummary = ({ seller, charge, maxInstallments, misc, onNext }) => {
    return (
        <FlowButtonsWrapper
            next={{
                title: 'próximo',
                onClick: onNext
            }}
        >
            <Summary
                seller={seller}
                charge={charge}
                maxInstallments={maxInstallments}
                misc={misc}
            />
        </FlowButtonsWrapper>
    )
}

FlowSummary.propTypes = {
    ...Summary.propTypes,
    onNext: PropTypes.func.isRequired
}

export default FlowSummary