import React from 'react'
import { Switch, Route } from 'wouter'
import { DisplayInputText } from './DisplayComponents/DisplayInputText/index'
import { DisplayEditableData } from './DisplayComponents/DisplayEditableData/index'
import { DisplayTabDual } from './DisplayComponents/DisplayTabDual/index'
import { DisplayDrawer } from './DisplayComponents/DisplayDrawer/index'
import { DisplayHeaderWithMenu } from './DisplayComponents/DisplayHeaderWithMenu/index'
import { DisplayDrawerPanel } from './DisplayComponents/DisplayDrawerPanel/index'

export const Router = () =>
	<Switch>
		<Route path='/input-text'><DisplayInputText /></Route>
		<Route path='/editable-data'><DisplayEditableData /></Route>
		<Route path='/tab-dual/:any'><DisplayTabDual /></Route>
		<Route path='/drawer'><DisplayDrawer /></Route>
		<Route path='/header-menu'><DisplayHeaderWithMenu /></Route>
		<Route path='/drawer-panel'><DisplayDrawerPanel /></Route>
		<Route path='/:any*'>Página não encontrada</Route>
	</Switch>