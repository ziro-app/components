import React from 'react'
import { Switch, Route } from 'wouter'
import FlowManager from '../../../components/FlowManager'
import Tab1 from './tab1'
import Tab2 from './tab2'
import Tab3 from './tab3'
import { BottomTabBar } from './bottomBar'

export const DisplayTabFlow = () => {

    return (
        <FlowManager defaultFooter={<BottomTabBar/>}>
            <Switch>
                <Route path='/tab-flow/1'><Tab1/></Route>
                <Route path='/tab-flow/2'><Tab2/></Route>
                <Route path='/tab-flow/3'><Tab3/></Route>
            </Switch>
        </FlowManager>
    )

}