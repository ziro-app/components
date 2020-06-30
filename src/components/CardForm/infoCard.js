import React from 'react';
import Button from '../Button';
import { infoCard, infoCardInfo, infoCardLabel, button } from './styles_catalog';

const PTstatus = {
  unavailable: 'Indisponível',
  waitingInfo: 'Aguardando grade e preço',
  waitingStock: 'Aguardando grade'
};

export default ({ image, product, setEditing }) => {
  return (
    <div style={infoCard}>
      {image}
      <div style={infoCardInfo}>
        <label style={infoCardLabel}>{PTstatus[product.status]}</label>
        <Button
          style={button}
          type="button"
          cta="Editar"
          click={() => setEditing(true)}
        />
      </div>
    </div>
  );
};
