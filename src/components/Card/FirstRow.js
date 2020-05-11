import React from 'react';
import PropTypes from 'prop-types';
import { icons, cartQty } from './styles';
import Icon from '../Icon';

const FirstRow = ({ cartIds, favoriteIds, productId, cartQuantity, brandName, onClickSoldOut, onFavoritePress, onCartPress }) => {
  return (
    <div style={icons()}>
      <div
        style={{ display: 'grid' }}
        onClick={() => {
          onClickSoldOut && onFavoritePress ?(!favoriteIds.includes(productId) && status === 'soldOut' ? onClickSoldOut() : onFavoritePress(productId)): null
        }}
      >
        <Icon type="heart" size={24} strokeWidth={1} fill={favoriteIds.includes(productId)} />
      </div>
      <div
        style={{ display: 'grid' }}
        onClick={() => {onClickSoldOut && onCartPress ?(!cartIds.includes(productId) && status === 'soldOut' ? onClickSoldOut() : onCartPress(brandName, productId)) : null
        }}
      >
        <Icon type="cart" size={24} strokeWidth={1} fill={cartIds.includes(productId)} />
      </div>
      {cartIds.includes(productId) && cartQuantity > 0 && (
        <label style={cartQty}>
          Na sua sacola e de mais {cartQuantity} pessoa
          {cartQuantity > 1 && 's'}
        </label>
      )}
      {cartIds.includes(productId) && (cartQuantity === 0 || !cartQuantity) && <label style={cartQty}>Na sua sacola</label>}
      {!cartIds.includes(productId) && cartQuantity > 0 && (
        <label style={cartQty}>
          Adicionado em {cartQuantity} sacola
          {cartQuantity > 1 && 's'}
        </label>
      )}
      {!cartIds.includes(productId) && (cartQuantity === 0 || !cartQuantity) && <div />}
    </div>
  );
};


export default FirstRow;
