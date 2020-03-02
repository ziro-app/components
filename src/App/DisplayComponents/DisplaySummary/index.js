import React from 'react'
import Header from '../../../components/Header/index'
import Summary from '../../../components/Summary'
import { containerWithPadding } from '@ziro/theme'

export const DisplaySummary = () => {
	return (
		<div style={containerWithPadding}>
            <Header type='title-only' title='Nova Fatura'/>
            <Summary
                seller='Crisfael'
                charge='60078'
                maxInstallments='6'
                misc={{
                    title: 'Sobre a loja',
                    text: 'A Crisfael é um parceira Ziro'
                }}
            />
        </div>
	)
}