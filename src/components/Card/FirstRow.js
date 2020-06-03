import React from 'react';
import PropTypes from 'prop-types';
import { icons, cartQty } from './styles';
import Icon from '../Icon';

const FirstRow = ({ isAddedToCart, isFavorited, cartQuantity, onFavoritePress, onCartPress }) => {
  return (
    <div style={icons()}>
      <div
        style={{ display: 'grid' }}
        onClick={onFavoritePress}
      >
        <Icon type="heart" size={24} strokeWidth={1} fill={isFavorited} />
      </div>
      <div
        style={{ display: 'grid' }}
        onClick={onCartPress}
      >
        <Icon type="cart" size={24} strokeWidth={1} fill={isAddedToCart} />
      </div>
      {isAddedToCart && cartQuantity > 0 && (
        <label style={cartQty}>
          Na sua sacola e de mais {cartQuantity} pessoa
          {cartQuantity > 1 && 's'}
        </label>
      )}
      {isAddedToCart && (cartQuantity === 0 || !cartQuantity) && <label style={cartQty}>Na sua sacola</label>}
      {!isAddedToCart && cartQuantity > 0 && (
        <label style={cartQty}>
          Na sacola de {cartQuantity} pessoa
          {cartQuantity > 1 && 's'}
        </label>
      )}
      {!isAddedToCart && (cartQuantity === 0 || !cartQuantity) && <div />}
    </div>
  );
};


export default FirstRow;
