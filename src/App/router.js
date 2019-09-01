import React from 'react'
import { Switch, Route } from 'wouter'

export const Router = () =>
	<Switch>
		<Route path='/input-text'></Route>
		<Route path='/editable-data'></Route>
		<Route path='/:any*'>Página não encontrada</Route>
	</Switch>