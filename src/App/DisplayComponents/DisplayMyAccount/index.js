import React from 'react'
import Header from '../../../components/Header/index'
import MyAccount from '../../../components/MyAccount/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayMyAccount = () =>
	<div style={containerWithPadding}>
		<Header type='icon' title='Meus Dados' icon='menu' />
		<MyAccount />
	</div>