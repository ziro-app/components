import React from 'react'
import TabDualTransition from '../../../components/TabDualTransition/index'
import TabDualHeader from '../../../components/TabDualHeader/index'
import { containerWithPadding } from '../../../Theme/variables'
import { component } from './styles'

//overflow: auto removes the scroll bar

export const DisplayTabDual = () => {
	return (
		<div style={containerWithPadding}>
			<TabDualHeader
				pathOne='/tab-dual/dados-1'
				tabNameOne='Dados 1'
				pathTwo='/tab-dual/dados-2'
				tabNameTwo='Dados 2'
			/>
			<TabDualTransition components={[
				{ path: '/tab-dual/dados-1', children: <div style={component}>Lorem Ipsum</div> },
				{ path: '/tab-dual/dados-2', children: <div style={component}>Dolor Sit</div> }
			]}/>
		</div>
	)
}