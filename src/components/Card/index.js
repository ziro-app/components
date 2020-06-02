import React from 'react';
import { useAnimatedLocation } from '../FlowManager';

import { motion } from 'framer-motion';
import Icon from '../Icon';
import RImg from 'react-image';
import {
  card,
  overlay,
  overlayContainer,
  cardBottom,
  image,
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
  isFavorited,
  isAddedToCart,
  photo,
  uid,
  setWLocation,
  setLocation,
  setModalHowToBuyOpen,
}) => {
  const { brandName, url, productId, timeInDays, cartQuantity, favQuantity, price, status, description, minimumItemQty, freeShipping } = photo;
  return (
    <RImg
      key={url}
      src={url}
      style={image}
      container={children => (
        <div style={card}>
          <div style={overlayContainer}>
            {status === 'soldOut' ? <div style={overlay}>esgotado</div> : null}
            {children}
          </div>
          <div style={cardBottom}>
            <FirstRow
              isAddedToCart={isAddedToCart}
              isFavorited={isFavorited}
              cartQuantity={cartQuantity}
              onFavoritePress={onFavoritePress}
              onCartPress={onCartPress}
            />

            <SecondRow description={description} uid={uid} setWLocation={setWLocation} price={price} setLocation={setLocation}  />

            <ThirdRow setLocation={setLocation} showBrandName={showBrandName} brandName={brandName} minimumItemQty={minimumItemQty} freeShipping={freeShipping} timeInDays={timeInDays} />
            <FourthRow setLocation={setLocation} brandName={brandName} uid={uid} setWLocation={setWLocation} setModalHowToBuyOpen={setModalHowToBuyOpen} />
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
  onFavoritePress: PropTypes.func,
  onCartPress: PropTypes.func,
  showBrandName: PropTypes.bool,
  showPrice : PropTypes.bool,
  photo: PropTypes.object,
  uid: PropTypes.string,
  setWLocation: PropTypes.func,
  setLocation: PropTypes.func,
  onClickSoldOut: PropTypes.func,
  isFeatured: PropTypes.bool,
  setModalHowToBuyOpen: PropTypes.func,
};

export default Card;
