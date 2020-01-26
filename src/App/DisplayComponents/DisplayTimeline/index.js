import React from 'react'
import Header from '../../../components/Header/index'
import Timeline from '../../../components/Timeline/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayTimeline = () =>
	<div style={containerWithPadding}>
		<Header type='icon' title='Meus Pagamentos' icon='menu' />
		<Timeline transactions={[
			{
				seller: 'Karmani',
				charge: '7.238,55',
				status: 'Pago',
				date: '30/ago'
			},
			{
				seller: 'Cor Doce',
				charge: '1.223,45',
				status: 'Pago',
				date: '30/ago'
			},
			{
				seller: 'La Chocole',
				charge: '6.778,99',
				status: 'Pago',
				date: '30/ago'
			},
			{
				seller: 'Confeccoes Mauricio',
				charge: '989,12',
				status: 'Pago',
				date: '27/ago'
			},
			{
				seller: 'Salgunamu',
				charge: '2.323,60',
				status: 'Pago',
				date: '27/ago'
			},
			{
				seller: 'Jo Fashion',
				charge: '4.450,55',
				status: 'Pago',
				date: '27/ago'
			},
			{
				seller: 'Loubucca',
				charge: '5.671,77',
				status: 'Pago',
				date: '27/ago'
			},
			{
				seller: 'Crisfael',
				charge: '1.299,02',
				status: 'Pago',
				date: '27/ago'
			},
		]} />
	</div>