import React from 'react';
import PropTypes from 'prop-types';
import { info3, timestampStyle2, info4 } from './styles';

const ThirdRow = ({ setLocation, showBrandName, brandName, timeInDays }) => {
  return (
    <div style={info3}>
      <label style={info4}>Mín. 6 peças, frete gratis</label>
      {timeInDays === 0 ? (
        <label style={timestampStyle2}>Hoje</label>
      ) : (
        <label style={timestampStyle2}>
          {timeInDays} dia
          {timeInDays > 0 && 's'} atrás
        </label>
      )}
    </div>
  );
};

export default ThirdRow;
