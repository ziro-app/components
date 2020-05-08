import React from 'react';
import PropTypes from 'prop-types';
import { icons, cartQty2 } from './styles';
import Icon from '../Icon';

const FirstRow = ({ cartIds, favoriteIds, productId, cartQuantity, brandName, onClickSoldOut }) => {
  return (
    <div style={icons()}>
      <div
        style={{ display: 'grid' }}
        onClick={() => {
          !favoriteIds.includes(productId) && status === 'soldOut' ? onClickSoldOut() : onFavoritePress(productId);
        }}
      >
        <Icon type="heart" size={24} strokeWidth={1} fill={favoriteIds.includes(productId)} />
      </div>
      <div
        style={{ display: 'grid' }}
        onClick={() => {
          !cartIds.includes(productId) && status === 'soldOut' ? onClickSoldOut() : onCartPress(brandName, productId);
        }}
      >
        <Icon type="cart" size={24} strokeWidth={1} fill={cartIds.includes(productId)} />
      </div>
      {cartIds.includes(productId) && cartQuantity > 0 && (
        <label style={cartQty2}>
          Na sua sacola e de mais {cartQuantity + 1} pessoa
          {cartQuantity > 1 && 's'}
        </label>
      )}
      {cartIds.includes(productId) && (cartQuantity === 0 || !cartQuantity) && <label style={cartQty2}>Na sua sacola</label>}
      {!cartIds.includes(productId) && cartQuantity > 0 && (
        <label style={cartQty2}>
          Adicionado em {cartQuantity} sacola
          {cartQuantity > 1 && 's'}
        </label>
      )}
      {!cartIds.includes(productId) && (cartQuantity === 0 || !cartQuantity) && <div />}
    </div>
  );
};

export default FirstRow;
