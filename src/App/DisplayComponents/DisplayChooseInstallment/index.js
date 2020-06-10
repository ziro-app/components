import React, { useState } from 'react'
import Header from '../../../components/Header/index'
import ChooseInstallment from '../../../components/ChooseInstallment'
import { containerWithPadding } from '@ziro/theme'

export const DisplayChooseInstallment = () => {

    const [installments, setInstallments] = useState()

    return (
        <div style={containerWithPadding}>
            <Header type='title-only' title='Finalizar'/>
            <ChooseInstallment
                seller='Crisfael'
                charge='60078'
                maxInstallments='6'
                card={{ number: '4839 **** 4382' }}
                installments={installments}
                setInstallments={setInstallments}
            />
        </div>
    )

}