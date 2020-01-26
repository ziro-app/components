import React from 'react'
import Header from '../../../components/Header/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayHeader = () =>
	<div style={containerWithPadding}>
		<Header type='title-only' title='Header Title Only' />
		<Header type='icon' title='Header Icon' icon='menu' setIsOpen={() => null} />
		<Header type='icon-link' title='Header Link' icon='back' />
	</div>