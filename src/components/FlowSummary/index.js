import React from 'react'
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

export default FlowSummary