import React from 'react'
import { Link } from 'wouter'
import Icon from '../Icon/index'
import { container, option, dot } from './styles'

const MyAccount = () =>
	<div style={container}>
		<Link href='/update-pass'>
			<label style={option}>Trocar senha&nbsp;&nbsp;
				<Icon type='lock' size={14} strokeWidth={3} />
				<span style={dot}>.</span>
			</label>
		</Link>
		<Link href='/update-email'>
			<label style={option}>Trocar email&nbsp;&nbsp;
				<Icon type='email' size={14} strokeWidth={3} />
				<span style={dot}>.</span>
			</label>
		</Link>
		<Link href='/delete-account'>
			<label style={option}>Deletar conta&nbsp;
				<Icon type='close' size={14} strokeWidth={3} />
				<span style={dot}>.</span>
			</label>
		</Link>
	</div>

export default MyAccount