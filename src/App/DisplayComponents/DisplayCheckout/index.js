import React from 'react'
import Checkout from '../../../components/Checkout/index'
import { container, padding } from '../../../Theme/variables'

export const DisplayCheckout = () =>
	<div style={{ ...container, padding: padding }}>
		<Checkout charge='8213.77' maxInstallments='6' />
	</div>