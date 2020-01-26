import React from 'react'
import Logo from '../Logo/index'
import Spinner from '../Spinner/index'
import { containerWithPadding } from '@ziro/theme'
import { container } from './styles'

const InitialLoader = () =>
	<div style={{...containerWithPadding, ...container}}>
		<Logo />
		<Spinner size={'6rem'} />
	</div>

export default InitialLoader