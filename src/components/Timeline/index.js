import React from 'react';
import PropTypes from 'prop-types';
import { primaryColor } from '@ziro/theme'
import Illustration from '../Illustration/index';
import Button from '../Button/index';
import SpinnerWithDiv from '../SpinnerWithDiv/index';
import Badge from '../Badge/index';
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
	secureCss,
} from './styles';

const Timeline = ({ transactions, transactionClick = () => null, btnMoreClick = () => null, btnTemplate, ctaButton, hasMore = false, isSearching = false, messageEmptyTransactions, messageWelcomeTransactions }) =>
	<>
		<style>{after}</style>
		{transactions.map((transaction, key) =>
			<div style={wrapper(key === (transactions.length - 1) && hasMore)} className='timeline' key={key} onClick={() => transactionClick({ transaction })}>
				{transaction.insurance && <Badge type='lock' style={secureCss} size={12} message='Com seguro' color={primaryColor} />}
				<label style={sellerCss}>{transaction.seller}</label>
				<label style={chargeCss}>{transaction.charge}</label>
				<label style={statusCss(transaction.statusColor)}>{transaction.status}</label>
				<label style={dateCss}>{transaction.date}</label>
			</div>
		)}
		<style>{afterWelcome}</style>
		{transactions && transactions.length !== 0 && !hasMore &&
			<div style={start} className='welcome'>
				<label style={welcome}>{messageWelcomeTransactions ? messageWelcomeTransactions : 'Bem-vindo à sua timeline'}</label>
			</div>}
		{!hasMore && <div style={illustration}><Illustration type='timelineStart' /></div>}
		{transactions && transactions.length === 0 &&
			<label style={empty}>{messageEmptyTransactions ? messageEmptyTransactions : 'Você ainda não realizou pagamentos'}</label>}
		{hasMore && !isSearching &&
			<Button
				type="button"
				cta={ctaButton ? ctaButton : 'Carregar mais'}
				template={btnTemplate ? btnTemplate : 'regular'}
				click={btnMoreClick}
			/>
		}
		{hasMore && isSearching &&
			<SpinnerWithDiv />
		}
	</>

Timeline.propTypes = {
	transactions: PropTypes.array.isRequired,
	transactionClick: PropTypes.func,
	btnMoreClick: PropTypes.func,
	btnTemplate: PropTypes.string,
	ctaButton: PropTypes.string,
	hasMore: PropTypes.bool,
	isSearching: PropTypes.bool
};

export default Timeline;
