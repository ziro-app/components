import React from 'react'
import FlowSummary from '../../../components/FlowSummary'
import { useLocation } from 'wouter'

export const DisplayFlowSummary = () => {
    return (
        <FlowSummary
            seller='Crisfael'
            charge='60078'
            maxInstallments='6'
            misc={{
                title: 'Sobre a loja',
                text: 'A crisfael é uma loja parceira da Ziro'
            }}
            next={{
                location: '/flow-choose-card'
            }}
        />
    )
}