import React, { Suspense } from 'react';
import { Switch, Route } from '../../../components/Route';
import FlowManager, { useHistory } from '../../../components/FlowManager';
import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';
import Tab4 from './tab4';
import { BottomTabBar } from './bottomBar';
import { FirebaseAppProvider } from 'reactfire';

const fbconfig = {
  apiKey: 'AIzaSyDaFomJyNXnSgb-AytezmgLVCJ9aQZKuig',
  authDomain: 'ziro-homolog.firebaseapp.com',
  databaseURL: 'https://ziro-homolog.firebaseio.com',
  projectId: 'ziro-homolog',
  storageBucket: 'ziro-homolog.appspot.com',
  messagingSenderId: '842197542628',
  appId: '1:842197542628:web:4d04fef777ce91a3d9aef1',
  measurementId: 'G-62WK2H4LQ8',
};

export const DisplayTabFlow = () => {
  return (
    <Suspense fallback={'seilaRoot'}>
      <FirebaseAppProvider firebaseConfig={fbconfig}>
        <FlowManager defaultFooter={<BottomTabBar />}>
          <Switch>
            <Route path="/tab-flow/1">
              <Tab1 />
            </Route>
            <Route path="/tab-flow/2">
              <Tab2 />
            </Route>
            <Route path="/tab-flow/3">
              <Tab3 />
            </Route>
            <Route path="/tab-flow/4">
              <Tab4 />
            </Route>
          </Switch>
        </FlowManager>
      </FirebaseAppProvider>
    </Suspense>
  );
};
