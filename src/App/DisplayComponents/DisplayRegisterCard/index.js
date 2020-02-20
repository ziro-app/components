import React from 'react'
import Header from '../../../components/Header/index'
import RegisterCard from '../../../components/RegisterCard/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayRegsiterCard = () =>
	<div style={containerWithPadding}>
		<Header type='title-only' title='Registrar novo cartão' />
		<RegisterCard charge='60078' maxInstallments='6' seller='Crisfael'
			sendToBackend={() => async () => await new Promise((res, rej) => setTimeout(() => rej('ok'), 1000))}
		/>
	</div>