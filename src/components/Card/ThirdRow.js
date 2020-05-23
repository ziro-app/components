import React from 'react';
import PropTypes from 'prop-types';
import { info3, timestampStyle, info4 } from './styles';

const ThirdRow = ({  timeInDays, minimumItemQty, freeShipping }) => {
  return (
    <div style={info3}>
      <label style={info4}>{minimumItemQty ? `Mín. ${minimumItemQty} peças variadas`: null}{minimumItemQty && freeShipping === 'sim' && ','} {freeShipping === 'sim' && 'frete grátis'}</label>
      {timeInDays === 0 ? (
        <label style={timestampStyle}>Hoje</label>
      ) : (
        <label style={timestampStyle}>
          {timeInDays} dia
          {timeInDays > 0 && 's'} atrás
        </label>
      )}
    </div>
  );
};

export default ThirdRow;
