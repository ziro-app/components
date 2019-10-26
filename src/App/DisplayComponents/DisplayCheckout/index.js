import React from 'react'
import Header from '../../../components/Header/index'
import Checkout from '../../../components/Checkout/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayCheckout = () =>
	<div style={containerWithPadding}>
		<Header type='title-only' title='Pagamento' />
		<Checkout charge='60078' maxInstallments='6' seller='Crisfael'
			sendToBackend={() => async () => await new Promise((res, rej) => setTimeout(() => rej('ok'), 1000))}
		/>
	</div>