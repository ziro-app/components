import React from 'react'
import ResendEmail from '../../../components/ResendEmail/index'

export const DisplayResendEmail = () =>
	<ResendEmail sendToBackend={
		() => async () => await new Promise((res, rej) => setTimeout(() => res('Confirmação enviada!'), 1500))
	} />