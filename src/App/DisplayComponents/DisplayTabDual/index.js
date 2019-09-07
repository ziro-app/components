import React, { Fragment } from 'react'
import { Link } from 'wouter'
import TransitionTab from '../../../components/TransitionTab/index'
import TabDualHeader from '../../../components/TabDualHeader/index'
import { nav, component } from './styles'

export const DisplayTabDual = () => {
	return (
		<Fragment>
			<TabDualHeader
				pathOne='/tab-dual/dados-1'
				tabNameOne='Dados 1'
				pathTwo='/tab-dual/dados-2'
				tabNameTwo='Dados 2'
			/>
			<TransitionTab components={[
				{ path: '/transition/1', children: <div style={component}>Lorem Ipsum</div> },
				{ path: '/transition/2', children: <div style={component}>Dolor Sit</div> }
			]}/>
		</Fragment>
	)
}