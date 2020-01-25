import React from 'react'
import { Link } from 'wouter'
import Icon from '../Icon/index'
import Footer from '../Footer/index'
import { container, option, dot } from './styles'

const MyAccount = () =>
	<div style={container}>
		<Link href='/trocar-senha'>
			<label style={option}>Trocar senha&nbsp;&nbsp;
				<Icon type='lock' size={14} strokeWidth={3} />
				<span style={dot}>.</span>
			</label>
		</Link>
		<Link href='/trocar-email'>
			<label style={option}>Trocar email&nbsp;&nbsp;
				<Icon type='email' size={14} strokeWidth={3} />
				<span style={dot}>.</span>
			</label>
		</Link>
		<Link href='/deletar-conta'>
			<label style={option}>Deletar conta&nbsp;
				<Icon type='close' size={14} strokeWidth={3} />
				<span style={dot}>.</span>
			</label>
		</Link>
		<Footer phone='+55 (11) 3334-0920' />
	</div>

export default MyAccount