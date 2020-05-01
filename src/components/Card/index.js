import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { useAnimatedLocation } from '../FlowManager';
import { motion } from 'framer-motion';
import Icon from '../Icon';
import RImg from 'react-image';
import {
  brand,
  card,
  cardBottom,
  container,
  icons,
  priceButton,
  image,
  info,
  timestampStyle,
  cart,
} from './styles';
import PropTypes from 'prop-types';

const Card = ({
  onFavoritePress,
  onCartPress,
  showBrandName = true,
  showPrice = true,
  favoriteIds,
  cartIds,
  photos,
  photo,
  uid,
  useToast,
  wLocation,
  setWLocation,
  endPageAfterNavigation,
  test = true,
}) => {
  useEffect(() => {
    wLocation === '/' && setWLocation('/novidades');
  }, []);
  const [, setLocation] = useAnimatedLocation();
  const initialCount = () =>
    Number(window.localStorage.getItem('sliceMax')) || 20;
  const [sliceMax, setSliceMax] = useState(initialCount);

  window.onbeforeunload = () => {
    localStorage.clear();
  };
  console.log(endPageAfterNavigation);
  if (test === true) {
    //uid = 'doesntChangeNothing';
    photo = [
      {
        brandName: 'Salgunamu',
        cartAdded: false,
        cartUsersQuantity: 0,
        howMuchDays: 1,
        likesUsers: undefined,
        plural: '',
        pluralCart: '',
        productId: '4N83pCtkkrQm8hLY1dQL',
        today: true,
        url:
          'https://firebasestorage.googleapis.com/v0/b/ziro-app-data.appspot.com/o/Salgunamu%2FSalgunamu-1588270812994-159%2C90.jpeg?alt=media&token=060e81f8-f6a8-44a9-b7a6-c03478032fa2',
      },
    ];
    favoriteIds = ['4N83pCtkkrQm8hLY1dQL'];
    cartIds = ['4N83pCtkkrQm8hLY1dQL'];
  }

  if (uid) showPrice = false;

  return (
    <>
      <div style={container} id="list">
        {photo.map(
          (
            {
              brandName,
              url,
              productId,
              howMuchDays,
              plural,
              today,
              pluralCart,
              cartUsersQuantity,
              cartAdded,
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
                      <div onClick={() => onFavoritePress(productId)}>
                        <Icon
                          type="heart"
                          size={24}
                          strokeWidth={1}
                          fill={favoriteIds.includes(productId)}
                        />
                      </div>
                      <div
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
                      {/* eslint-disable-next-line no-nested-ternary */}
                      {cartIds.includes(productId) ||
                      cartUsersQuantity > 0 ? (
                        cartAdded || cartIds.includes(productId) ? (
                          <div style={cart}>
                            {cartUsersQuantity > 0 ? (
                              <label style={{ fontSize: '12px' }}>
                                Você e outra{pluralCart}{' '}
                                {cartUsersQuantity} pessoa
                                {pluralCart} colocaram na sacola
                              </label>
                            ) : (
                              <label style={{ fontSize: '12px' }}>
                                Você colocou este item em sua sacola
                              </label>
                            )}
                          </div>
                        ) : (
                          <div style={cart}>
                            <label style={{ fontSize: '12px' }}>
                              {' '}
                              Na sacola de {cartUsersQuantity} pessoa
                              {pluralCart}{' '}
                            </label>
                          </div>
                        )
                      ) : (
                        <div />
                      )}
                      {!uid ? (
                        <label
                          style={priceButton}
                          onClick={() => setWLocation('/cadastrar')}
                        >
                          ver preço
                        </label>
                      ) : (
                        <div />
                      )}
                    </div>

                    <div style={info}>
                      <label
                        style={brand}
                        onClick={() =>
                          setLocation(
                            'goLeft',
                            `marcas/${brandName
                              .replace(/\s/g, '-')
                              .toLowerCase()}`
                          )
                        }
                      >
                        {showBrandName ? brandName : null}
                      </label>
                      {today ? (
                        <label style={timestampStyle}>Hoje</label>
                      ) : (
                        <label style={timestampStyle}>
                          {howMuchDays} dia{plural} atrás
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
      </div>
    </>
  );
};

Card.propTypes = {
  cartIds: PropTypes.arrayOf(PropTypes.object),
  favoriteIds: PropTypes.arrayOf(PropTypes.object),
};

export default Card;
