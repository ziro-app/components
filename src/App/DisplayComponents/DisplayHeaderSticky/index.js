import React from 'react'
import Header from '../../../components/Header/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayHeaderSticky = () =>
	<div style={containerWithPadding}>
		<Header type='sticky' title='Hello' />
	</div>