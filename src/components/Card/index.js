import React, { useCallback } from 'react';
import { useAnimatedLocation } from '../FlowManager';
import currencyFormat from '@ziro/currency-format';
import { motion } from 'framer-motion';
import Icon from '../Icon';
import RImg from 'react-image';
import {
  brand,
  card,
  cardBottom,
  icons,
  priceButton,
  image,
  info,
  cartQty,
  timestampStyle,
  values,
} from './styles';
import PropTypes from 'prop-types';

const Card = ({
  onFavoritePress,
  onCartPress,
  showBrandName = true,
  showPrice = true,
  favoriteIds,
  cartIds,
  photo,
  uid,
  setWLocation,
  setLocation,
  isFeatured = true,
  test = true,
}) => {
  if (test === true) {
    // uid = 'doesntChangeNothing';
    photo = [
      {
        brandName: 'Salgunamu',
        description: 'Vestido forro',
        favQuantity: 0,
        photoPeriod: 'Nova',
        cartQuantity: 2,
        price: '14990',
        pricetag: 'Não',
        productId: 'hKxUGL9CuKScXvBQ98Ve',
        status: 'available',
        timeInDays: 2,
        url:
          'https://firebasestorage.googleapis.com/v0/b/ziro-app-data.appspot.com/o/Salgunamu%2FSalgunamu-1588112070123-VESTIDO%20COM%20FORRO%20149%2C90.jpg?alt=media&token=50ed388c-ab3f-4a82-aaad-18a2933a5d3c',
      },
    ];
    favoriteIds = ['hKxUGL9CuKScXvBQ98Ve'];
    cartIds = ['hKxUGL9CuKScXvBQ98Ve'];
  }

  return (
    <>
      {photo.map(
        (
          {
            brandName,
            url,
            productId,
            timeInDays,
            cartQuantity,
            favQuantity,
            price,
          },
          index
        ) => (
          <RImg
            key={url}
            src={url}
            style={image}
            container={(children) => (
              <motion.div
                style={card}
                initial={{ opacity: 0, y: '-5%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{
                  type: 'tween',
                  delay: index < 5 ? (3 * index) / 10 : 0,
                }}
              >
                {children}
                <div style={cardBottom}>
                  <div style={icons(showPrice)}>
                    <div
                      style={{ display: 'grid' }}
                      onClick={() => onFavoritePress(productId)}
                    >
                      <Icon
                        type="heart"
                        size={24}
                        strokeWidth={1}
                        fill={favoriteIds.includes(productId)}
                      />
                    </div>
                    <div
                      style={{ display: 'grid' }}
                      onClick={() =>
                        onCartPress(brandName, productId)
                      }
                    >
                      <Icon
                        type="shoppingBag"
                        size={24}
                        strokeWidth={1}
                        fill={cartIds.includes(productId)}
                      />
                    </div>
                    {cartIds.includes(productId) && cartQuantity > 0 && (
                      <label style={cartQty}>
                        Adic. em {cartQuantity} sacola
                        {cartQuantity > 1 && 's'}
                      </label>
                    )}
                    {cartIds.includes(productId) &&
                      (cartQuantity === 0 || !cartQuantity) && (
                        <label style={cartQty}>
                          Adic. em 1 sacola
                        </label>
                      )}
                    {!cartIds.includes(productId) &&
                      cartQuantity > 0 && (
                        <label style={cartQty}>
                          Adic. em {cartQuantity} sacola
                          {cartQuantity > 1 && 's'}
                        </label>
                      )}
                    {!cartIds.includes(productId) &&
                      (cartQuantity === 0 || !cartQuantity) && (
                        <div />
                      )}
                    {!uid ? (
                      <label
                        style={priceButton}
                        onClick={() => setWLocation('/cadastrar')}
                      >
                        preço
                      </label>
                    ) : price ? (
                      <label style={values}>
                        {currencyFormat(price)}
                      </label>
                    ) : (
                      <div />
                    )}
                  </div>

                  <div style={info}>
                    <label
                      style={brand}
                      onClick={() => {
                        setLocation
                          ? setLocation(
                              'goLeft',
                              `marcas/${brandName
                                .replace(/\s/g, '-')
                                .toLowerCase()}`
                            )
                          : null;
                      }}
                    >
                      {showBrandName ? brandName : null}
                    </label>
                    {timeInDays === 0 ? (
                      <label style={timestampStyle}>Hoje</label>
                    ) : (
                      <label style={timestampStyle}>
                        {timeInDays} dia{timeInDays > 0 && 's'} atrás
                      </label>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            loaderContainer={() => <div key={url} />}
          />
        )
      )}
    </>
  );
};

Card.propTypes = {
  cartIds: PropTypes.arrayOf(PropTypes.string),
  favoriteIds: PropTypes.arrayOf(PropTypes.string),
};

export default Card;
