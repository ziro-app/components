import React from 'react';
import Table from '../../../components/Table/index';
import Header from '../../../components/Header/index';
import { containerWithPadding } from '@ziro/theme';

const data = [
	{
		title: 'Lançamentos Futuros',
		header: ['Parc.','(R$) Bruto','(R$) Líquido','Cliente'],
		rows: [
			['1','1.000,11','950,00','SIRLENE DOS SANTOS 16984534852'],
			['2','1.000,11','950,00','FATIMA DAS GRACAS DA SILVA CORDEIRO 03997962669'],
			['3','1.000,11','950,00','LUCINEIA CANGUSSU DE SOUZA 28464368860']
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
