import React, { useState } from 'react'
import FormRegisterStoreowner from '../../../components/FormRegisterStoreowner/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayFormRegisterStoreowner = () => {
	const [isLoading, setIsLoading] = useState(false)
	const validCnaes = ['47.81-4-00', '14.12-6-01', '14.12-6-03'];
	const cnpjUrl = process.env.CNPJ_URL || '';
	const cnpjToken = process.env.CNPJ_TOKEN || '';

	return (
		<div style={containerWithPadding}>
			<FormRegisterStoreowner isLoading={isLoading} setIsLoading={setIsLoading} sendToBackend={() => () => console.log('sendToBackend')} fetch={() => console.log('Your fetch function')} hasAdvisor={true} hasAffiliated={true} haveSalesman={true} validCnaes={validCnaes} cnpjUrl={cnpjUrl} cnpjToken={cnpjToken} />
		</div>
	)
}