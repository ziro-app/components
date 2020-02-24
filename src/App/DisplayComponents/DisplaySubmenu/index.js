import React from 'react'
import Submenu from '../../../components/Submenu/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplaySubmenu = () =>
	<div style={containerWithPadding}>
		<Submenu options={['Cadastrar lojista', 'Upload de imagens']} />
	</div>