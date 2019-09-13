import React, { useState } from 'react'
import Drawer from '../../../components/Drawer/index'
import DrawerPanel from '../../../components/DrawerPanel/index'
import HeaderWithMenu from '../../../components/HeaderWithMenu/index'
import Icon from '../../../components/Icon/index'
import { container } from './styles'

export const DisplayDrawer = () => {
	const [isOpen, setIsOpen] = useState(true)
	return (
		<div style={container}>
			<HeaderWithMenu title='Meus Dados' setIsOpen={() => setIsOpen(true)} />
			<Drawer isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
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
			</Drawer>
		</div>
	)
}