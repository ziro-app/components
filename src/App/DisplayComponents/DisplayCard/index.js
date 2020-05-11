import React from 'react';
import Card from '../../../components/Card/index';
import { title } from './styles';
import { container } from '@ziro/theme';

export const DisplayCard = () => {
  const photo1 = {
    brandName: "Salgunamu",
    description: 'Vestido forro',
    favQuantity: 0,
    photoPeriod: 'Nova',
    cartQuantity: 20,
    price: '14990',
    pricetag: 'Não',
    productId: 'hKxUGL9CuKScXvBQ98Ve',
    status: 'available',
    minimumItemQty:8,
    freeShipping:true,
    timeInDays: 2,
    url:
      'https://firebasestorage.googleapis.com/v0/b/ziro-app-data.appspot.com/o/Salgunamu%2FSalgunamu-1588112070123-VESTIDO%20COM%20FORRO%20149%2C90.jpg?alt=media&token=50ed388c-ab3f-4a82-aaad-18a2933a5d3c',
  };
  const photo2 = {
    brandName: 'Salgunamu',
    description: '',
    favQuantity: 0,
    photoPeriod: 'Nova',
    cartQuantity: 2,
    price: '14990',
    pricetag: 'Não',
    productId: 'hKxUGL9CuKScXvBQ98Ve',
    status: 'available',
    timeInDays: 2,
    minimumItemQty:6,
    freeShipping:true,
    url:
      'https://firebasestorage.googleapis.com/v0/b/ziro-app-data.appspot.com/o/Salgunamu%2FSalgunamu-1588112070123-VESTIDO%20COM%20FORRO%20149%2C90.jpg?alt=media&token=50ed388c-ab3f-4a82-aaad-18a2933a5d3c',
  };
  const photo3 = {
    brandName: 'Salgunamu',
    description: 'Vestido forro',
    favQuantity: 0,
    photoPeriod: 'Nova',
    cartQuantity: 20,
    price: '14990',
    pricetag: 'Não',
    productId: 'hKxUGL9CuKScXvBQ98Ve',
    status: 'available',
    timeInDays: 2,
    minimumItemQty:6,
    freeShipping:true,
    url:
      'https://firebasestorage.googleapis.com/v0/b/ziro-app-data.appspot.com/o/Salgunamu%2FSalgunamu-1588112070123-VESTIDO%20COM%20FORRO%20149%2C90.jpg?alt=media&token=50ed388c-ab3f-4a82-aaad-18a2933a5d3c',
  };
  const photo4 = {
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
    minimumItemQty:6,
    freeShipping:true,
    url:
      'https://firebasestorage.googleapis.com/v0/b/ziro-app-data.appspot.com/o/Salgunamu%2FSalgunamu-1588112070123-VESTIDO%20COM%20FORRO%20149%2C90.jpg?alt=media&token=50ed388c-ab3f-4a82-aaad-18a2933a5d3c',
  };
  const photo5 = {
    brandName: 'Salgunamu',
    description: '',
    favQuantity: 0,
    photoPeriod: 'Nova',
    cartQuantity: 2,
    price: '',
    pricetag: 'Não',
    productId: 'hKxUGL9CuKScXvBQ98Ve',
    status: 'available',
    timeInDays: 2,
    minimumItemQty:6,
    freeShipping:true,
    url:
      'https://firebasestorage.googleapis.com/v0/b/ziro-app-data.appspot.com/o/Salgunamu%2FSalgunamu-1588112070123-VESTIDO%20COM%20FORRO%20149%2C90.jpg?alt=media&token=50ed388c-ab3f-4a82-aaad-18a2933a5d3c',
  };
  const photo6 = {
    brandName: 'Salgunamu',
    description: '',
    favQuantity: 0,
    photoPeriod: 'Nova',
    cartQuantity: 0,
    price: '',
    pricetag: 'Não',
    productId: 'hKxUGL9CuKScXvBQ98Ve',
    status: 'available',
    timeInDays: 1,
    minimumItemQty:6,
    freeShipping:true,
    url:
      'https://firebasestorage.googleapis.com/v0/b/ziro-app-data.appspot.com/o/Salgunamu%2FSalgunamu-1588112070123-VESTIDO%20COM%20FORRO%20149%2C90.jpg?alt=media&token=50ed388c-ab3f-4a82-aaad-18a2933a5d3c',
  };
  const photo7 = {
    brandName: 'Salgunamu',
    description: '',
    favQuantity: 0,
    photoPeriod: 'Nova',
    cartQuantity: 0,
    price: '',
    pricetag: 'Não',
    productId: 'hKxUGL9CuKScXvBQ98Ve',
    status: 'available',
    timeInDays: 0,
    minimumItemQty:6,
    freeShipping:true,
    url:
      'https://firebasestorage.googleapis.com/v0/b/ziro-app-data.appspot.com/o/Salgunamu%2FSalgunamu-1588112070123-VESTIDO%20COM%20FORRO%20149%2C90.jpg?alt=media&token=50ed388c-ab3f-4a82-aaad-18a2933a5d3c',
  };
  const favoriteIds = ['ahKxUGL9CuKScXvBQ98Ve'];
  const favoriteIdsSelected = ['hKxUGL9CuKScXvBQ98Ve'];
  const cartIds = ['ahKxUGL9CuKScXvBQ98Ve'];
  const cartIdsSelected = ['hKxUGL9CuKScXvBQ98Ve'];
  return (
    <div style={{...container, maxWidth: '400px', display: 'grid', gridRowGap: '30px', margin: '30px auto'}}>
      <label style={title}>Deslogado</label>
      <Card favoriteIds={favoriteIds} cartIds={cartIds} photo={photo1} uid={false} />
      <label style={title}>Deslogado e sem descrição</label>
      <Card favoriteIds={favoriteIds} cartIds={cartIds} photo={photo2} uid={false} />
      <label style={title}>Logado</label>
      <Card favoriteIds={favoriteIdsSelected} cartIds={cartIdsSelected} photo={photo3} uid={true} />
      <label style={title}>Logado e Esgotado</label>
      <Card favoriteIds={favoriteIds} cartIds={cartIds} photo={photo4} uid={true} />
      <label style={title}>Logado, sem descrição e sem preço</label>
      <Card favoriteIds={favoriteIds} cartIds={cartIds} photo={photo5} uid={true} />
      <label style={title}>Logado, versão mínima</label>
      <Card favoriteIds={favoriteIds} cartIds={cartIds} photo={photo6} uid={true} />
      <label style={title}>Deslogado, versão mínima</label>
      <Card favoriteIds={favoriteIds} cartIds={cartIds} photo={photo7} uid={false} />
    </div>
  );
};
