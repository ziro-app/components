import React from 'react';
import PropTypes from 'prop-types';
import Illustration from '../Illustration/index';
import Button from '../Button/index';
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

const Timeline = ({ transactions, transactionClick = () => null, btnMoreClick = () => null, btnTemplate, ctaButton, hasMore = false }) =>
	<>
		<style>{after}</style>
		{transactions.map((transaction, key) =>
			<div style={wrapper(key === (transactions.length - 1) && hasMore)} className='timeline' key={key} onClick={() => transactionClick({ transaction })}>
				<label style={sellerCss}>{transaction.seller}</label>
				<label style={chargeCss}>{transaction.charge}</label>
				<label style={statusCss(transaction.statusColor)}>{transaction.status}</label>
				<label style={dateCss}>{transaction.date}</label>
			</div>
		)}
		<style>{afterWelcome}</style>
		{transactions && transactions.length !== 0 && !hasMore &&
			<div style={start} className='welcome'>
				<label style={welcome}>Bem-vindo à sua timeline</label>
			</div>}
		{!hasMore && <div style={illustration}><Illustration type='timelineStart' /></div>}
		{transactions && transactions.length === 0 &&
			<label style={empty}>Você ainda não realizou pagamentos</label>}
		{hasMore && <Button
			type="button"
			cta={ctaButton ? ctaButton : 'Carregar mais'}
			template={btnTemplate ? btnTemplate : 'regular'}
			click={btnMoreClick}
		/>}
	</>

Timeline.propTypes = {
	transactions: PropTypes.array.isRequired,
	transactionClick: PropTypes.func,
	btnMoreClick: PropTypes.func,
	btnTemplate: PropTypes.string,
	ctaButton: PropTypes.string,
	hasMore: PropTypes.bool
};

export default Timeline;