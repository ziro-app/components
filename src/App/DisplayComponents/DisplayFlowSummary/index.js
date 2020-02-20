import React from 'react'
import FlowSummary from '../../../components/FlowSummary'
import { containerWithPadding } from '@ziro/theme'
import Header from '../../../components/Header'
import { useLocation } from 'wouter'

export const DisplayFlowSummary = () => {
    const [,setLocation] = useLocation()
    return (
        <FlowSummary
            seller='Crisfael'
            charge='60078'
            maxInstallments='6'
            misc={{
                title: 'Sobre a loja',
                text: 'A crisfael é uma loja parceira da Ziro'
            }}
            onNext={() => setLocation('/flow-choose-card')}
        />
    )
}