import React from 'react'
import BottomTabBar from '../../../components/BottomTabBar/index'
import Icon from '../../../components/Icon/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayBottomTabBar = () =>
	<div style={containerWithPadding}>
		<BottomTabBar
	      buttons={[
	        {
	          location: '/novidades',
	          icon: isSelected => <Icon type="home" size={20} strokeWidth={1} fill={isSelected} />,
	        },
	        {
	          location: '/galeria',
	          secondaryLocations: ['/marcas'],
	          icon: isSelected => <Icon type="search" size={20} strokeWidth={isSelected ? 3 : 1} />,
	        },
	        {
	          location: '/favoritos',
	          secondaryLocations: [],
	          icon: isSelected => <Icon type="heart" size={20} strokeWidth={1} fill={isSelected} />,
	          notificationNumber: 20,
	        },
	        {
	          location: '/sacola',
	          secondaryLocations: [],
	          icon: isSelected => <Icon type="shoppingBag" size={20} strokeWidth={1} fill={isSelected} />,
	          notificationNumber: 20,
	        },
	        {
	          key: 'user',
	          secondaryLocations: ['/meus-dados', '/trocar-email', '/trocar-senha', '/deletar-conta'],
	          onClick: () => setIsOpen(old => !old),
	          icon: isSelected => <Icon type="user" size={20} strokeWidth={1} fill={isSelected} />,
	        },
	      ]}
		/>
	</div>