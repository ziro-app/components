import React from 'react';
import PropTypes from 'prop-types';
import { howToBuy, info2, brandStyle } from './styles';

import Icon from '../Icon';

const FourthRow = ({ brandName, setLocation, setModalHowToBuyOpen }) => {
  return (
    <div style={info2}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gridColumnGap: '3px',
          alignItems: 'center'
        }}
        onClick={() => {
          setLocation ? setLocation('goLeft', `marcas/${brandName.replace(/\s/g, '-').toLowerCase()}`) : null;
        }}
      >
        <label style={brandStyle}>{brandName}</label>
        {setLocation ? <Icon type="forward" size={13} strokeWidth={1} /> : null}
      </div>
      <label style={howToBuy} onClick={() => setModalHowToBuyOpen ?setModalHowToBuyOpen(true) : null}>
        Como Comprar?
      </label>
    </div>
  );
};

export default FourthRow;