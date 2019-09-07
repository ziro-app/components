import React from 'react'
import { Switch, Route } from 'wouter'
import { DisplayInputText } from './DisplayComponents/DisplayInputText/index'
import { DisplayEditableData } from './DisplayComponents/DisplayEditableData/index'
import { DisplayTransitionTab } from './DisplayComponents/DisplayTransitionTab/index'

export const Router = () =>
	<Switch>
		<Route path='/input-text'><DisplayInputText /></Route>
		<Route path='/editable-data'><DisplayEditableData /></Route>
		<Route path='/transition/:any'><DisplayTransitionTab /></Route>
		<Route path='/:any*'>Página não encontrada</Route>
	</Switch>