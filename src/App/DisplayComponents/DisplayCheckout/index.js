import React from 'react'
import Checkout from '../../../components/Checkout/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayCheckout = () =>
	<div style={containerWithPadding}>
		<Checkout charge='60078' maxInstallments='6' seller='Crisfael' />
	</div>