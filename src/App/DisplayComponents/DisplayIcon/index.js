import React from 'react'
import Icon from '../../../components/Icon/index'
import { containerWithPadding } from '@ziro/theme'
import { grid } from './styles'

export const DisplayIcon = () =>
	<div style={{...containerWithPadding, ...grid}}>
		<Icon type='ziro' size={24} />
		<Icon type='amex' size={24} />
		<Icon type='visa' size={24} />
		<Icon type='mastercard' size={24} />
		<Icon type='elo' size={24} />
		<Icon type='hiper' size={24} />
		<Icon type='success' />
		<Icon type='alert' />
		<Icon type='warning' />
		<Icon type='pen' />
		<Icon type='close' />
		<Icon type='menu' />
		<Icon type='truck' />
		<Icon type='card' />
		<Icon type='user' />
		<Icon type='logout' />
		<Icon type='shopping' />
		<Icon type='back' />
		<Icon type='cnpj' />
		<Icon type='whats' size={24} />
		<Icon type='lock' />
		<Icon type='email' />
		<Icon type='calendar' />
		<Icon type='id' />
		<Icon type='location' />
		<Icon type='facebook' size={24} />
		<Icon type='instagram' size={24} />
		<Icon type='money' size={24} />
		<Icon type='gear' size={24} />
		<Icon type='present' size={24} />
		<Icon type='trending' size={24} />
		<Icon type='globe' size={24} />
		<Icon type='add' size={24} />
		<Icon type='send' size={24} />
		<Icon type='filter' size={24} />
	</div>