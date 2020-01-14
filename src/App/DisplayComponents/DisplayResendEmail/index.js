import React from 'react'
import ResendEmail from '../../../components/ResendEmail/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayResendEmail = () =>
	<div style={containerWithPadding}>
		<ResendEmail sendToBackend={
			() => async () => await new Promise((res, rej) => setTimeout(() => res('Confirmação enviada!'), 1500))
		} />
	</div>