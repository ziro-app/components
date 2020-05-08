import React, { useCallback } from 'react';
import { useAnimatedLocation } from '../FlowManager';

import { motion } from 'framer-motion';
import Icon from '../Icon';
import RImg from 'react-image';
import {
  card,
  overlay,
  overlayContainer,
  cardBottom,
  icons,
  priceButton,
  image,
  info,
  cartQty,
  timestampStyle,
  values,
  card2,
  overlay2,
  overlayContainer2,
  cardBottom2,
  icons2,
  priceButton2,
  image2,
  info2,
  cartQty2,
  timestampStyle2,
  values2,
  registerButton,
  howToBuy,
  info3,
  info4,
} from './styles';
import FirstRow from './FirstRow';
import SecondRow from './SecondRow';
import PropTypes from 'prop-types';
import FourthRow from './FourthRow';
import ThirdRow from './ThirdRow';

const Card = ({
  onFavoritePress,
  onCartPress,
  showBrandName = true,
  showPrice = true,
  favoriteIds,
  cartIds,
  photo,
  uid,
  setWLocation,
  setLocation,
  onClickSoldOut,
  isFeatured = true,
  setModalHowToBuyOpen,
}) => {
  const { brandName, url, productId, timeInDays, cartQuantity, favQuantity, price, status, description } = photo;
  return (
    <RImg
      key={url}
      src={url}
      style={image2}
      container={children => (
        <div style={card2}>
          <div style={overlayContainer2}>
            {status === 'soldOut' ? <div style={overlay2}>esgotado</div> : null}
            {children}
          </div>
          <div style={cardBottom2}>
            <FirstRow
              cartIds={cartIds}
              favoriteIds={favoriteIds}
              productId={productId}
              cartQuantity={cartQuantity}
              onClickSoldOut={onClickSoldOut}
              brandName={brandName}
            />

            <SecondRow description={description} uid={uid} setWLocation={setWLocation} price={price} setLocation={setLocation} brandName />

            <ThirdRow setLocation={setLocation} showBrandName={showBrandName} brandName={brandName} timeInDays={timeInDays} />
            <FourthRow brandName={brandName} uid={uid} setWLocation={setWLocation} setModalHowToBuyOpen={setModalHowToBuyOpen} />
          </div>
        </div>
      )}
      loaderContainer={() => <div key={url} />}
    />
  );
};

Card.propTypes = {
  cartIds: PropTypes.arrayOf(PropTypes.string),
  favoriteIds: PropTypes.arrayOf(PropTypes.string),
};

export default Card;
