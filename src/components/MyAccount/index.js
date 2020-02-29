import React from 'react'
import { Link } from 'wouter'
import Icon from '../Icon/index'
import Footer from '../Footer/index'
import { container, option, optionWhite, dot } from './styles'

const MyAccount = ({ haveHelp = false }) =>
	<div style={container}>
		<Link href='/update'>
			<label style={option}>Atualizar dados&nbsp;&nbsp;
				<Icon type='pen' size={14} strokeWidth={3} color='white' />
				<span style={dot}>.</span>
			</label>
		</Link>
		<Link href='/trocar-senha'>
			<label style={option}>Trocar senha&nbsp;&nbsp;
				<Icon type='lock' size={14} strokeWidth={3} color='white' />
				<span style={dot}>.</span>
			</label>
		</Link>
		<Link href='/trocar-email'>
			<label style={option}>Trocar email&nbsp;&nbsp;
				<Icon type='email' size={14} strokeWidth={3} color='white' />
				<span style={dot}>.</span>
			</label>
		</Link>
		<Link href='/deletar-conta'>
			<label style={optionWhite}>Deletar conta&nbsp;
				<Icon type='close' size={14} strokeWidth={3} />
				<span style={dot}>.</span>
			</label>
		</Link>
		{haveHelp && <Footer phone='+55 (11) 3334-0920' />}
	</div>

export default MyAccount