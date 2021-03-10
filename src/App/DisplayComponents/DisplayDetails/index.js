import React from 'react';
import Details from '../../../components/Details/index';
import Header from '../../../components/Header/index';
import Button from '../../../components/Button/index';
import { containerWithPadding, successColor } from '@ziro/theme';

const blocks = [
	{
		header: 'Compra',
		body: [
			{
				title: 'Título com nome bastante comprido',
				content: 'Marca com nome bastante comprido'
			},
			{
				title: 'Valor',
				content: 'R$3.000,33'
			},
			{
				title: 'Forma',
				content: 'crédito 3x'
			},
			{
				title: 'Data',
				content: '23/02/20'
			},
			{
				title: 'Status',
				content: 'Aprovada',
				color: successColor
			},
			{
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				isDescription: true
			}
		]
	},
	{
		header: 'Cartão',
		body: [
			{
				title: 'Bandeira',
				content: 'Mastercard'
			},
			{
				title: 'Número',
				content: '4444...1111'
			},
			{
				title: 'Portador',
				content: 'Fulano de tal'
			}
		]
	},
]

export const DisplayDetails = () =>
	<div style={containerWithPadding}>
		<Header type='icon-link' icon='back' title='Detalhes' navigateTo='home' />
		<Details blocks={blocks} blockGap='20px' />
		<div style={{ marginBottom: '40px' }}></div>
		<Button type='button' cta='Gerar comprovante' />
	</div>
