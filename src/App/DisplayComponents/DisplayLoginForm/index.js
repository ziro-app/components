import React from 'react'
import LoginForm from '../../../components/LoginForm/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayLoginForm = () =>
	<div style={containerWithPadding}>
		<LoginForm
			sendToBackend={state => () => {
				console.log(state)
				return new Promise((res,rej) => res(console.log('ok')))
			}
		}/>
	</div>