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
import { DisplayLoginTrouble } from './DisplayComponents/DisplayLoginTrouble/index'
import { DisplayResetPass } from './DisplayComponents/DisplayResetPass/index'
import { DisplayMyAccount } from './DisplayComponents/DisplayMyAccount/index'
import { DisplayUpdateEmail } from './DisplayComponents/DisplayUpdateEmail/index'
import { DisplayUpdatePass } from './DisplayComponents/DisplayUpdatePass/index'
import { DisplayDeleteAccount } from './DisplayComponents/DisplayDeleteAccount/index'
import { DisplaySocialMedia } from './DisplayComponents/DisplaySocialMedia/index'
import { DisplayInputPicture } from './DisplayComponents/DisplayInputPicture/index'
import { DisplayFormRegisterStoreowner } from './DisplayComponents/DisplayFormRegisterStoreowner/index'
import { DisplayCamera } from './DisplayComponents/DisplayCamera/index'
import { DisplayCameraContainer } from './DisplayComponents/DisplayCameraContainer/index'
import { DisplaySummary } from './DisplayComponents/DisplaySummary/index'
import { DisplayFlowSummary } from './DisplayComponents/DisplayFlowSummary/index'
import { DisplayChooseCard } from './DisplayComponents/DisplayChooseCard/index'
import { DisplayFlowChooseCard } from './DisplayComponents/DisplayFlowChooseCard/index'
import { DisplayChooseInstallment } from './DisplayComponents/DisplayChooseInstallment/index'
import { DisplayFlowChooseInstallment } from './DisplayComponents/DisplayFlowChooseInstallment'
import { DisplayFlowRegisterCard } from './DisplayComponents/DisplayFlowRegisterCard/index'
import { DisplayImageUpload } from './DisplayComponents/DisplayImageUpload/index'
import { DisplaySubmenu } from './DisplayComponents/DisplaySubmenu/index'

export const App = () =>
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
		<Route path='/login-trouble'><DisplayLoginTrouble /></Route>
		<Route path='/reset-pass'><DisplayResetPass /></Route>
		<Route path='/my-account'><DisplayMyAccount /></Route>
		<Route path='/update-email'><DisplayUpdateEmail /></Route>
		<Route path='/update-pass'><DisplayUpdatePass /></Route>
		<Route path='/delete-account'><DisplayDeleteAccount /></Route>
		<Route path='/social-media'><DisplaySocialMedia /></Route>
		<Route path='/input-picture'><DisplayInputPicture /></Route>
		<Route path='/form-registerStoreowner'><DisplayFormRegisterStoreowner /></Route>
		<Route path='/camera'><DisplayCamera /></Route>
		<Route path='/camera-container'><DisplayCameraContainer /></Route>
		<Route path='/summary'><DisplaySummary /></Route>
		<Route path='/flow-summary'><DisplayFlowSummary /></Route>
		<Route path='/choose-card'><DisplayChooseCard /></Route>
		<Route path='/flow-choose-card'><DisplayFlowChooseCard /></Route>
		<Route path='/choose-installment'><DisplayChooseInstallment /></Route>
		<Route path='/flow-choose-installment'><DisplayFlowChooseInstallment /></Route>
		<Route path='/flow-register-card'><DisplayFlowRegisterCard /></Route>
		<Route path='/image-upload'><DisplayImageUpload /></Route>
		<Route path='/submenu'><DisplaySubmenu /></Route>
		<Route path='/:any*'>Página não encontrada</Route>
	</Switch>