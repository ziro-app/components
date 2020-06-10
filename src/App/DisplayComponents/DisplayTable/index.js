import React from 'react';
import Table from '../../../components/Table/index';
import Header from '../../../components/Header/index';
import Icon from '../../../components/Icon/index';
import { containerWithPadding } from '@ziro/theme';

const data = [
	{
		title: 'Lançamentos Futuros',
		header: ['Parc.','Bruto','Líquido','Data', ''],
		rows: [
			['1','1.000,11','950,00','20/04/20', <Icon type='chevronRight' size={14} />],
			['2','1.000,11','950,00','20/05/20', <Icon type='chevronRight' size={14} />],
			['3','1.000,11','950,00','20/06/20', <Icon type='chevronRight' size={14} />]
		],
		rowsClicks: [
			() => window.location.assign('/table/1'),
			() => window.location.assign('/table/2'),
			() => window.location.assign('/table/3')
		],
		totals: ['-','3.000,33','2.850,00','-','']
	}
]

export const DisplayTable = () =>
	<div style={containerWithPadding}>
		<Header type='icon-link' icon='back' title='Detalhes' navigateTo='home' />
		<Table data={data} customGrid={{ gridTemplateColumns: 'auto 1fr 1fr 1fr 20px' }}
			cellStyle={{
				width: '100%',
				height: '100%',
				fontSize: '1.4rem',
				textAlign: 'center',
				textOverflow: 'ellipsis',
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				cursor: 'pointer'
			}}
		/>
	</div>
