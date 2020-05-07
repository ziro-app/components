import React from 'react';
import Card from '../../../components/Card/index';
import { container } from '@ziro/theme';

export const DisplayCard = () => {
  const uid = 'doesntChangeNothing';
  const photo = [
    {
      brandName: 'Salgunamu',
      description: 'Vestido forro',
      favQuantity: 0,
      photoPeriod: 'Nova',
      cartQuantity: 2,
      price: '14990',
      pricetag: 'Não',
      productId: 'hKxUGL9CuKScXvBQ98Ve',
      status: 'soldOut',
      timeInDays: 2,
      url:
        'https://firebasestorage.googleapis.com/v0/b/ziro-app-data.appspot.com/o/Salgunamu%2FSalgunamu-1588112070123-VESTIDO%20COM%20FORRO%20149%2C90.jpg?alt=media&token=50ed388c-ab3f-4a82-aaad-18a2933a5d3c',
    },
  ];
  const favoriteIds = ['hKxUGL9CuKScXvBQ98Ve'];
  const cartIds = ['hKxUGL9CuKScXvBQ98Ve'];
  return (
    <div style={container}>
      <Card
        selectedCard={2}
        favoriteIds={favoriteIds}
        cartIds={cartIds}
        photo={photo}
        uid={false}
        test={false}
      />
    </div>
  );
};
