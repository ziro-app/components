import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Illustration from '../Illustration/index';
import {
  after,
  afterWelcome,
  wrapper,
  sellerCss,
  chargeCss,
  statusCss,
  dateCss,
  start,
  welcome,
  illustration,
  empty,
} from './styles';
import { successColor } from '@ziro/theme';
import Details from './Details/index';

const Timeline = (
  { transactions, onClick = () => null },
  showDetail = false,
  setShowDetail
) => {
  const [renderPaymentDetails, setRenderPaymentDetails] = useState(
    false
  );
  const [blocksPayment, setBlocksPayment] = useState([]);
  const clickOnTransaction = useCallback(
    (transaction, showDetail) => {
      const blocks = [
        {
          header: 'Compra',
          body: [
            {
              title: 'Marca',
              content: transaction.seller,
            },
            {
              title: 'Valor',
              content: transaction.charge,
            },
            {
              title: 'Forma',
              content: transaction.installments,
            },
            {
              title: 'Data',
              content: transaction.date,
            },
            {
              title: 'Status',
              content: transaction.status,
              color: successColor,
            },
          ],
        },
        {
          header: 'Cartão',
          body: [
            {
              title: 'Bandeira',
              content: transaction.brand,
            },
            {
              title: 'Número',
              content: `${transaction.firstFour}...${transaction.lastFour}`,
            },
            {
              title: 'Portador',
              content: transaction.cardholder,
            },
          ],
        },
      ];
      setBlocksPayment(blocks);
      if (showDetail) {
        setShowDetail(true);
        setRenderPaymentDetails(true);
      } else setRenderPaymentDetails(false);
    },
    [showDetail]
  );
  return (
    <>
      {renderPaymentDetails ? (
        <Details
          blocks={blocksPayment}
          setRenderPaymentDetails={setRenderPaymentDetails}
        />
      ) : (
        <>
          <style>{after}</style>
          {transactions.map(
            ({ seller, charge, status, date }, key) => (
              <div
                style={wrapper}
                className="timeline"
                key={key}
                onClick={() => {
                  onClick;
                  clickOnTransaction(transactions[key], true);
                }}
              >
                <label style={sellerCss}>{seller}</label>
                <label style={chargeCss}>{charge}</label>
                <label style={statusCss}>{status}</label>
                <label style={dateCss}>{date}</label>
              </div>
            )
          )}
          <style>{afterWelcome}</style>
          {transactions && transactions.length !== 0 && (
            <div style={start} className="welcome">
              <label style={welcome}>Bem-vindo à sua timeline</label>
            </div>
          )}
          <div style={illustration}>
            <Illustration type="timelineStart" />
          </div>
          {transactions && transactions.length === 0 && (
            <label style={empty}>
              Você ainda não realizou pagamentos
            </label>
          )}
        </>
      )}
    </>
  );
};

Timeline.propTypes = {
  transactions: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

export default Timeline;
