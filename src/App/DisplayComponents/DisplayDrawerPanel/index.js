import React from 'react'
import DrawerPanel from '../../../components/DrawerPanel/index'
import Icon from '../../../components/Icon/index'

export const DisplayDrawerPanel = () =>
	<DrawerPanel
		username='Vitor Barbosa'
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