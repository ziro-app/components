import React from 'react';
import Table from '../../../components/Table/index';
import Header from '../../../components/Header/index';
import { containerWithPadding } from '@ziro/theme';

const data = [
	{
		title: 'Lançamentos Futuros',
		header: ['Parc.','(R$) Bruto','(R$) Líquido','Data'],
		rows: [
			['1','1.000,11','950,00','23/03'],
			['2','1.000,11','950,00','23/04'],
			['3','1.000,11','950,00','23/05']
		],
		rowsClicks: [
			() => window.location.assign('/table/1'),
			() => window.location.assign('/table/2'),
			() => window.location.assign('/table/3')
		],
		totals: ['-','3.000,33','2.850,00','-']
	}
]

export const DisplayTable = () =>
	<div style={containerWithPadding}>
		<Header type='icon-link' icon='back' title='Detalhes' navigateTo='home' />
		<Table data={data} customGrid={{
			gridTemplateColumns: 'auto 1fr 1fr 1fr'
		}} />
	</div>
