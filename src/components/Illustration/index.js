import React from 'react';
import PropTypes from 'prop-types';
import { PaymentSuccess } from '../../Illustrations/PaymentSuccess/index';
import { PaymentError } from '../../Illustrations/PaymentError/index';
import { ErrorLoading } from '../../Illustrations/ErrorLoading/index';
import { NotFound } from '../../Illustrations/NotFound/index';
import { TimelineStart } from '../../Illustrations/TimelineStart/index';
import { ProfileData } from '../../Illustrations/ProfileData/index';
import { Buy } from '../../Illustrations/Buy';
import { RegisterSuccess } from '../../Illustrations/RegisterSuccess';
import { WithoutFavorites } from '../../Illustrations/WithoutFavorites';
import { WithoutCartItem } from '../../Illustrations/WithoutCartItem';
import { Waiting } from '../../Illustrations/Waiting';
import { NoData } from '../../Illustrations/NoData';
import { CreditCard } from "../../Illustrations/CreditCard";
import { Chatting } from "../../Illustrations/Chatting";
import { OnlinePosts } from "../../Illustrations/OnlinePosts";
import { SelfieOne } from "../../Illustrations/SelfieOne";
import { SelfieTwo } from "../../Illustrations/SelfieTwo";
import { OnlyVestuary } from "../../Illustrations/OnlyVestuary";
import { Security } from '../../Illustrations/Security';
import { CnhPhoto } from '../../Illustrations/CnhPhoto';
import { CardAnalysis } from '../../Illustrations/CardAnalysis';
import { UpgradePlan } from '../../Illustrations/UpgradePlan';
import { Account } from '../../Illustrations/Account';

const Illustration = ({ type, size }) => {
  const illustrationProps = { size };
  const illustrationList = {
      paymentSuccess: <PaymentSuccess {...illustrationProps} />,
      paymentError: <PaymentError {...illustrationProps} />,
      errorLoading: <ErrorLoading {...illustrationProps} />,
      notFound: <NotFound {...illustrationProps} />,
      timelineStart: <TimelineStart {...illustrationProps} />,
      profileData: <ProfileData {...illustrationProps} />,
      buy: <Buy {...illustrationProps} />,
      registerSuccess: <RegisterSuccess {...illustrationProps} />,
      withoutFavorites: <WithoutFavorites {...illustrationProps} />,
      withoutCartItem: <WithoutCartItem {...illustrationProps} />,
      waiting: <Waiting {...illustrationProps} />,
      noData: <NoData {...illustrationProps} />,
      creditCard: <CreditCard {...illustrationProps} />,
      chatting: <Chatting {...illustrationProps} />,
      onlinePosts: <OnlinePosts {...illustrationProps} />,
      selfieOne: <SelfieOne {...illustrationProps} />,
      selfieTwo: <SelfieTwo {...illustrationProps} />,
      onlyVestuary: <OnlyVestuary {...illustrationProps} />,
      security: <Security {...illustrationProps} />,
      cnhPhoto: <CnhPhoto {...illustrationProps} />,
      cardAnalysis: <CardAnalysis {...illustrationProps} />,
      upgradePlan: <UpgradePlan {...illustrationProps} />,
      account: <Account {...illustrationProps} />
  };
  return illustrationList[type];
};

Illustration.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default Illustration;
