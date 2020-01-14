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
import { DisplayNotFound } from './DisplayComponents/DisplayNotFound/index'
import { DisplayTimeline } from './DisplayComponents/DisplayTimeline/index'
import { DisplayErrorBoundary } from './DisplayComponents/DisplayErrorBoundary/index'
import { DisplayAbout } from './DisplayComponents/DisplayAbout/index'
import { DisplayIcon } from './DisplayComponents/DisplayIcon/index'
import { DisplayLanding } from './DisplayComponents/DisplayLanding/index'
import { DisplayHeroImage } from './DisplayComponents/DisplayHeroImage/index'
import { DisplayLoginForm } from './DisplayComponents/DisplayLoginForm/index'
import { DisplayLoginPage } from './DisplayComponents/DisplayLoginPage/index'
import { DisplayConfirmEmail } from './DisplayComponents/DisplayConfirmEmail/index'
import { DisplayFooter } from './DisplayComponents/DisplayFooter/index'
import { DisplayError } from './DisplayComponents/DisplayError/index'
import { DisplayForm } from './DisplayComponents/DisplayForm/index'
import { DisplayResendEmail } from './DisplayComponents/DisplayResendEmail/index'

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
		<Route path='/not-found'><DisplayNotFound /></Route>
		<Route path='/timeline'><DisplayTimeline /></Route>
		<Route path='/error-boundary'><DisplayErrorBoundary /></Route>
		<Route path='/about'><DisplayAbout /></Route>
		<Route path='/icon'><DisplayIcon /></Route>
		<Route path='/landing'><DisplayLanding /></Route>
		<Route path='/hero-image'><DisplayHeroImage /></Route>
		<Route path='/login-form'><DisplayLoginForm /></Route>
		<Route path='/login-page'><DisplayLoginPage /></Route>
		<Route path='/confirm-email'><DisplayConfirmEmail /></Route>
		<Route path='/footer'><DisplayFooter /></Route>
		<Route path='/error'><DisplayError /></Route>
		<Route path='/form'><DisplayForm /></Route>
		<Route path='/resend-email'><DisplayResendEmail /></Route>
		<Route path='/:any*'>Página não encontrada</Route>
	</Switch>