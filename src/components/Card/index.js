import React, { useCallback } from 'react';
import { useAnimatedLocation } from '../FlowManager';
import currencyFormat from '@ziro/currency-format';
import { motion } from 'framer-motion';
import Icon from '../Icon';
import RImg from 'react-image';
import {
  card,
  overlay,
  overlayContainer,
  cardBottom,
  icons,
  priceButton,
  image,
  info,
  cartQty,
  timestampStyle,
  values,
  card2,
  overlay2,
  overlayContainer2,
  cardBottom2,
  icons2,
  priceButton2,
  image2,
  info2,
  cartQty2,
  timestampStyle2,
  values2,
  registerButton,
  howToBuy,
  info3,
  info4,
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
  onClickSoldOut,
  isFeatured = true,
  test = true,
  setModalHowToBuyOpen,

  selectedCard = 1,
}) => {
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
            status,
          },
          index
        ) =>
          selectedCard === 1 ? (
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
                  <div style={overlayContainer}>
                    {status === 'soldOut' ? (
                      <div style={overlay}>esgotado</div>
                    ) : null}
                    {children}
                  </div>
                  <div style={cardBottom}>
                    <div style={icons(showPrice)}>
                      <div
                        style={{ display: 'grid' }}
                        onClick={() => {
                          !favoriteIds.includes(productId) &&
                          status === 'soldOut'
                            ? onClickSoldOut()
                            : onFavoritePress(productId);
                        }}
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
                        onClick={() => {
                          !cartIds.includes(productId) &&
                          status === 'soldOut'
                            ? onClickSoldOut()
                            : onCartPress(brandName, productId);
                        }}
                      >
                        <Icon
                          type="cart"
                          size={24}
                          strokeWidth={1}
                          fill={cartIds.includes(productId)}
                        />
                      </div>
                      {cartIds.includes(productId) &&
                        cartQuantity > 0 && (
                          <label style={cartQty}>
                            Adic. em {cartQuantity + 1} sacola
                            {cartQuantity > 0 && 's'}
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
                          {timeInDays} dia{timeInDays > 0 && 's'}{' '}
                          atrás
                        </label>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              loaderContainer={() => <div key={url} />}
            />
          ) : (
            selectedCard === 2 && (
              <RImg
                key={url}
                src={url}
                style={image2}
                container={(children) => (
                  <motion.div
                    style={card2}
                    initial={{ opacity: 0, y: '-5%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    transition={{
                      type: 'tween',
                      delay: index < 5 ? (3 * index) / 10 : 0,
                    }}
                  >
                    <div style={overlayContainer2}>
                      {status === 'soldOut' ? (
                        <div style={overlay2}>esgotado</div>
                      ) : null}
                      {children}
                    </div>
                    <div style={cardBottom2}>
                      <div style={icons(showPrice)}>
                        <div
                          style={{ display: 'grid' }}
                          onClick={() => {
                            !favoriteIds.includes(productId) &&
                            status === 'soldOut'
                              ? onClickSoldOut()
                              : onFavoritePress(productId);
                          }}
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
                          onClick={() => {
                            !cartIds.includes(productId) &&
                            status === 'soldOut'
                              ? onClickSoldOut()
                              : onCartPress(brandName, productId);
                          }}
                        >
                          <Icon
                            type="cart"
                            size={24}
                            strokeWidth={1}
                            fill={cartIds.includes(productId)}
                          />
                        </div>
                        {cartIds.includes(productId) &&
                          cartQuantity > 0 && (
                            <label style={cartQty2}>
                              Na sua sacola e de mais{' '}
                              {cartQuantity + 1} pessoa
                              {cartQuantity > 1 && 's'}
                            </label>
                          )}
                        {cartIds.includes(productId) &&
                          (cartQuantity === 0 || !cartQuantity) && (
                            <label style={cartQty2}>
                              Na sua sacola
                            </label>
                          )}
                        {!cartIds.includes(productId) &&
                          cartQuantity > 0 && (
                            <label style={cartQty2}>
                              Adicionado em {cartQuantity} sacola
                              {cartQuantity > 1 && 's'}
                            </label>
                          )}
                        {!cartIds.includes(productId) &&
                          (cartQuantity === 0 || !cartQuantity) && (
                            <div />
                          )}
                      </div>

                      <div style={info2}>
                        <label
                          style={info4}
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
                          Mín. 6 peças, frete gratis
                        </label>
                        {!uid ? (
                          <label
                            style={priceButton2}
                            onClick={() => setWLocation('/cadastrar')}
                          >
                            ver preço
                          </label>
                        ) : price ? (
                          <label style={values}>
                            {currencyFormat(price)}
                          </label>
                        ) : (
                          <div />
                        )}
                      </div>

                      {!uid ? (
                        <>
                          <div style={info2}>
                            {!uid ? (
                              <label
                                style={registerButton}
                                onClick={() =>
                                  setWLocation('/cadastrar')
                                }
                              >
                                Cadastre-se
                              </label>
                            ) : (
                              <div />
                            )}
                            <label
                              style={howToBuy}
                              onClick={() =>
                                setModalHowToBuyOpen(true)
                              }
                            >
                              Como Comprar?
                            </label>
                          </div>
                          <div style={info3}>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
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
                              <label>
                                {showBrandName ? brandName : null}
                              </label>
                              {setLocation ? (
                                <Icon
                                  type="forward"
                                  size={16}
                                  strokeWidth={1}
                                />
                              ) : null}
                            </div>
                            {timeInDays === 0 ? (
                              <label style={timestampStyle2}>
                                Hoje
                              </label>
                            ) : (
                              <label style={timestampStyle2}>
                                {timeInDays} dia
                                {timeInDays > 0 && 's'} atrás
                              </label>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={info3}>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
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
                              <label>
                                {showBrandName ? brandName : null}
                              </label>
                              {setLocation ? (
                                <Icon
                                  type="forward"
                                  size={16}
                                  strokeWidth={1}
                                />
                              ) : null}
                            </div>
                            {timeInDays === 0 ? (
                              <label style={timestampStyle2}>
                                Hoje
                              </label>
                            ) : (
                              <label style={timestampStyle2}>
                                {timeInDays} dia
                                {timeInDays > 0 && 's'} atrás
                              </label>
                            )}
                          </div>
                          <div style={info2}>
                            {!uid ? (
                              <label
                                style={registerButton}
                                onClick={() =>
                                  setWLocation('/cadastrar')
                                }
                              >
                                Cadastre-se
                              </label>
                            ) : (
                              <div />
                            )}
                            <label
                              style={howToBuy}
                              onClick={() =>
                                setWLocation('/cadastrar')
                              }
                            >
                              Como Comprar?
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
                loaderContainer={() => <div key={url} />}
              />
            )
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
