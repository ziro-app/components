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
				status: 'Aguardando pagamento',
				date: '27/ago',
				statusColor: '#F7BA00',
				insurance: true,
			},
			{
				seller: 'Jo Fashion',
				charge: '4.450,55',
				status: 'Pré Autorizado',
				date: '27/ago',
				statusColor: '#F7BA00',
				insurance: true,
			},
			{
				seller: 'Wermeson Rocha da Silva',
				charge: '5.671,77',
				status: 'Pago',
				date: '27/ago',
				insurance: true,
				statusColor: '#4BCA81'
			},
			{
				seller: 'Crisfael',
				charge: '1.299,02',
				status: 'Cancelado',
				insurance: true,
				date: '27/ago',
				statusColor: '#bb2124'
			},
		]} transactionClick={({ transaction }) => console.log(transaction)} btnMoreClick={() => console.log('Função usada para carregar mais dados')} hasMore={true} />
	</div>