import React, { useState } from 'react'
import Summary from '../../../components/Summary'

export const DisplaySummary = () => {
	return (
		<Summary
            seller='LOJA X'
            charge='1234567'
            maxInstallments='12'
            misc={{
                title: 'Sobre a loja',
                text: 'Essa é uma loja x'
            }}
        />
	)
}