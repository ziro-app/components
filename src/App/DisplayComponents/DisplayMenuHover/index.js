import React from 'react'
import MenuHover from '../../../components/MenuHover'
import { containerWithPadding } from '@ziro/theme'

export const DisplayMenuHover = () =>
	<div style={{...containerWithPadding, display: 'grid', alignContent: 'start', gridRowGap: '30px'}}>
		<MenuHover
			options={[
				{ label: 'Novos', onClick: () => null },
				{ label: 'Preços', onClick: () => null },
				{ label: 'Trend', onClick: () => null },
				{ label: 'Mais', onClick: () => null }
			]}
			maxWidth='none'
		/>
		<MenuHover
			options={[
				{ label: 'Preços', onClick: () => null },
				{ label: 'Trend', onClick: () => null },
				{ label: 'Mais', onClick: () => null }
			]}
		/>
		<MenuHover
			options={[
				{ label: 'Trend', onClick: () => null },
				{ label: 'Mais', onClick: () => null }
			]}
			maxWidth='180px'
		/>
		<MenuHover
			options={[
				{ label: 'Filtro', onClick: () => window.location.replace('/home'), icon: 'filter' },
			]}
			maxWidth='100px'
		/>
	</div>