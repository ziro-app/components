import React from 'react';
import Table from '../../../components/Table/index';
import Header from '../../../components/Header/index';
import { containerWithPadding } from '@ziro/theme';

const data = [
	{
		title: 'Lançamentos',
		header: ['#','Bruto','Liquido','Data'],
		rows: [
			['1/3','R$1.000,11','R$950,00','23/03/20'],
			['2/3','R$1.000,11','R$950,00','23/04/20'],
			['3/3','R$1.000,11','R$950,00','23/05/20']
		],
		totals: ['3','R$3.000,33','R$2.850,00','23/05/20']
	}
]

export const DisplayTable = () =>
	<div style={containerWithPadding}>
		<Header type='icon-link' icon='back' title='Detalhes' navigateTo='home' />
		<Table data={data} />
	</div>
