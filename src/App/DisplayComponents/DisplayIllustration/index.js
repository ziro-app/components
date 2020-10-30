import React from 'react';
import Illustration from '../../../components/Illustration/index';
import { containerWithPadding } from '@ziro/theme';
import { grid } from './styles';

export const DisplayIllustration = () => (
           <div style={{ ...containerWithPadding, ...grid }}>
               <Illustration type="paymentSuccess" size={200} />
               <Illustration type="paymentError" size={200} />
               <Illustration type="errorLoading" size={200} />
               <Illustration type="notFound" size={200} />
               <Illustration type="timelineStart" size={200} />
               <Illustration type="profileData" size={200} />
               <Illustration type="buy" size={200} />
               <Illustration type="withoutCartItem" size={200} />
               <Illustration type="waiting" size={200} />
               <Illustration type="noData" size={200} />
               <Illustration type="creditCard" size={200} />
               <Illustration type="chatting" size={200} />
               <Illustration type="withoutFavorites" size={200} />
               <Illustration type="registerSuccess" size={200} />
               <Illustration type="onlinePosts" size={200} />
               <Illustration type="selfieOne" size={200} />
               <Illustration type="selfieTwo" size={200} />
               <Illustration type="onlyVestuary" size={200} />
               <Illustration type="security" size={200} />
               <Illustration type="cardAnalysis" size={200} />
               <Illustration type="upgradePlan" size={200} />
               <Illustration type="account" size={200} />
               <Illustration type="cnhPhoto" size={200} />
           </div>
       );
