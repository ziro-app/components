import React from 'react'
import Login from '../../../components/Login/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayLogin = () =>
	<div style={containerWithPadding}>
		<Login
			sendToBackend={state => () => {
				console.log(state)
				return new Promise((res,rej) => rej('nok'))
			}
		}/>
	</div>