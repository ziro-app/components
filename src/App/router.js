import React from 'react'
import { Switch, Route } from 'wouter'
import { DisplayInputText } from './DisplayComponents/DisplayInputText/index'
import { DisplayInputEdit } from './DisplayComponents/DisplayInputEdit/index'
import { DisplayTabDual } from './DisplayComponents/DisplayTabDual/index'
import { DisplayDrawer } from './DisplayComponents/DisplayDrawer/index'
import { DisplayDrawerPanel } from './DisplayComponents/DisplayDrawerPanel/index'
import { DisplayCallToAction } from './DisplayComponents/DisplayCallToAction/index'
import { DisplayHeader } from './DisplayComponents/DisplayHeader/index'
import { DisplayHeaderHome } from './DisplayComponents/DisplayHeaderHome/index'
import { DisplayLogo } from './DisplayComponents/DisplayLogo/index'
import { DisplayTransitionRoute } from './DisplayComponents/DisplayTransitionRoute/index'
import { DisplayCheckout } from './DisplayComponents/DisplayCheckout/index'
import { DisplayDropdown } from './DisplayComponents/DisplayDropdown/index'
import { DisplayModal } from './DisplayComponents/DisplayModal/index'
import { DisplayErrorLoading } from './DisplayComponents/DisplayErrorLoading/index'

export const Router = () =>
	<Switch>
		<Route path='/input-text'><DisplayInputText /></Route>
		<Route path='/input-edit'><DisplayInputEdit /></Route>
		<Route path='/tab-dual/:any'><DisplayTabDual /></Route>
		<Route path='/drawer'><DisplayDrawer /></Route>
		<Route path='/drawer-panel'><DisplayDrawerPanel /></Route>
		<Route path='/cta'><DisplayCallToAction /></Route>
		<Route path='/header'><DisplayHeader /></Route>
		<Route path='/header-home'><DisplayHeaderHome /></Route>
		<Route path='/logo'><DisplayLogo /></Route>
		<Route path='/transition/:any'><DisplayTransitionRoute /></Route>
		<Route path='/checkout'><DisplayCheckout /></Route>
		<Route path='/dropdown'><DisplayDropdown /></Route>
		<Route path='/modal'><DisplayModal /></Route>
		<Route path='/error-loading'><DisplayErrorLoading /></Route>
		<Route path='/:any*'>Página não encontrada</Route>
	</Switch>