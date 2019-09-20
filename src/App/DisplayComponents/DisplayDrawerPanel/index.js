import React, { useState, useEffect } from 'react'
import DrawerPanel from '../../../components/DrawerPanel/index'
import Icon from '../../../components/Icon/index'
import { container } from './styles'

export const DisplayDrawerPanel = () => {
	const [username, setUsername] = useState('')
	useEffect(() => {
		const run = async () => {
		  const msg = await new Promise(resolve =>
		    setTimeout(() => setUsername('Vitor Barbosa'), 1000)
		  );
		  console.log(msg);
		}
		run()
	}, [])
	return (
		<div style={container}>
			<DrawerPanel
				username={username}
				usercnpj='28.026.371/0001-61'
				options={[
					{
						path: '#',
						icon: <Icon type='truck' size={13} strokeWidth={3} />,
						text: 'Atendimentos'
					},
					{
						path: '#',
						icon: <Icon type='card' size={13} strokeWidth={3} />,
						text: 'Pagamentos'
					},
					{
						path: '#',
						icon: <Icon type='user' size={13} strokeWidth={3} />,
						text: 'Meus Dados'
					},
					{
						path: '#',
						icon: <Icon type='logout' size={13} strokeWidth={3} />,
						text: 'Sair'
					},
				]}
			/>
		</div>
	)
}