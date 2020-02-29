import React, { useState } from 'react'
import FormRegisterStoreowner from '../../../components/FormRegisterStoreowner/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayFormRegisterStoreowner = () => {
	const [isLoading, setIsLoading] = useState(false)

	return (
		<div style={containerWithPadding}>
			<FormRegisterStoreowner isLoading={isLoading} setIsLoading={setIsLoading} sendToBackend={() => () => console.log('sendToBackend')} searchCnpj={() => () => console.log('searchCnpj')} fetch={() => console.log('Your fetch function')} hasAdvisor={true} hasAffiliated={true} haveSalesman={true} />
		</div>
	)
}