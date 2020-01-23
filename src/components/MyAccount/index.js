import React from 'react'
import Icon from '../Icon/index'
import { container, option, dot } from './styles'

const MyAccount = () =>
	<div style={container}>
		<label style={option}>Trocar senha&nbsp;&nbsp;
			<Icon type='lock' size={14} strokeWidth={3} />
			<span style={dot}>.</span>
		</label>
		<label style={option}>Trocar email&nbsp;&nbsp;
			<Icon type='email' size={14} strokeWidth={3} />
			<span style={dot}>.</span>
		</label>
		<label style={option}>Deletar conta&nbsp;
			<Icon type='close' size={14} strokeWidth={3} />
			<span style={dot}>.</span>
		</label>
	</div>

export default MyAccount