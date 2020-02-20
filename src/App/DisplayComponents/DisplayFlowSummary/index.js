import React from 'react'
import FlowSummary from '../../../components/FlowSummary'

export const DisplayFlowSummary = () => {
    return (
        <FlowSummary
            seller='LOJA X'
            charge='1234567'
            maxInstallments='8'
            onNext={() => {}}
        />
    )
}