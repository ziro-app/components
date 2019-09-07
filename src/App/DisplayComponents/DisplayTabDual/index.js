import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import TabDualTransition from '../../../components/TabDualTransition/index'
import TabDualHeader from '../../../components/TabDualHeader/index'
import { component } from './styles'

export const DisplayTabDual = () => {
	return (
		<div>
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