import React from 'react'
import Checkout from '../../../components/Checkout/index'
import Icon from '../../../components/Icon/index'
import { container } from '../../../Theme/variables'

export const DisplayCheckout = () =>
	<div style={container}>
		<Checkout />
		<Icon type='hiper' />
		<Icon type='elo' />
	</div>