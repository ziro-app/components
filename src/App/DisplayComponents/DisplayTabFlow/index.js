import React from 'react'
import { Switch, Route, useLocation } from 'wouter'
import FlowManager from '../../../components/FlowManagerV2'
import Tab1 from './tab1'
import Tab2 from './tab2'
import Tab3 from './tab3'

export const DisplayTabFlow = () => {

    return (
        <FlowManager>
            <Switch>
                <Route path='/tab-flow/1'><Tab1/></Route>
                <Route path='/tab-flow/2'><Tab2/></Route>
                <Route path='/tab-flow/3'><Tab3/></Route>
            </Switch>
        </FlowManager>
    )

}