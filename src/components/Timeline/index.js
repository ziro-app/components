import React from 'react';
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

const Timeline = ({ transactions, onClick = () => null }) =>
	<>
		<style>{after}</style>
		{transactions.map((transaction, key) =>
			<div style={wrapper} className='timeline' key={key} onClick={() => onClick({ transaction })}>
				<label style={sellerCss}>{transaction.seller}</label>
				<label style={chargeCss}>{transaction.charge}</label>
				<label style={statusCss(transaction.statusColor)}>{transaction.status}</label>
				<label style={dateCss}>{transaction.date}</label>
			</div>
		)}
		<style>{afterWelcome}</style>
		{transactions && transactions.length !== 0 &&
			<div style={start} className='welcome'>
				<label style={welcome}>Bem-vindo à sua timeline</label>
			</div>}
		<div style={illustration}><Illustration type='timelineStart' /></div>
		{transactions && transactions.length === 0 &&
			<label style={empty}>Você ainda não realizou pagamentos</label>}
	</>

Timeline.propTypes = {
	transactions: PropTypes.array.isRequired,
	onClick: PropTypes.func,
};

export default Timeline;