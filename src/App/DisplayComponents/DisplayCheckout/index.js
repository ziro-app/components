import React from 'react'
import Checkout from '../../../components/Checkout/index'
import Icon from '../../../components/Icon/index'
import { container, padding } from '../../../Theme/variables'

export const DisplayCheckout = () =>
	<div style={{ ...container, padding: padding }}>
		<Checkout />
	</div>