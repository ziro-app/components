import React from 'react'
import { Switch, Route } from 'wouter'
import { DisplayInputText } from './DisplayComponents/DisplayInputText/index'

export const Router = () =>
	<Switch>
		<Route path='/input-text'><DisplayInputText /></Route>
		<Route path='/editable-data'></Route>
		<Route path='/:any*'>Página não encontrada</Route>
	</Switch>