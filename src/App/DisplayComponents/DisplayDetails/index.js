import React from 'react';
import Details from '../../../components/Details/index';
import Header from '../../../components/Header/index';
import { containerWithPadding } from '@ziro/theme';

export const DisplayDetails = () =>
	<div style={containerWithPadding}>
		<Header type='icon-link' icon='back' title='Detalhes' navigateTo='home' />
		<Details />
	</div>
