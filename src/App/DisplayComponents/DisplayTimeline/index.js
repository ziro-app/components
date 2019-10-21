import React from 'react'
import Header from '../../../components/Header/index'
import Timeline from '../../../components/Timeline/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayTimeline = () =>
	<div style={containerWithPadding}>
		<Header type='icon' title='Meus Pagamentos' icon='menu' />
		<Timeline transactions={[]} />
	</div>