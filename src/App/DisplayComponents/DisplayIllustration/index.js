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
  </div>
);
