import React from 'react';
import PropTypes from 'prop-types';
import { values, priceButton2, info2, descriptionStyle } from './styles';
import currencyFormat from '@ziro/currency-format';

const SecondRow = ({ uid, setWLocation, price, setLocation, brandName, description }) => {
  return (
    <div style={info2}>
      <label style={descriptionStyle}>{description}</label>
      {!uid ? (
        <label style={priceButton2} onClick={() => setWLocation('/cadastrar')}>
          ver preço
        </label>
      ) : price ? (
        <label style={values}>{currencyFormat(price)}</label>
      ) : (
        <div />
      )}
    </div>
  );
};

export default SecondRow;
