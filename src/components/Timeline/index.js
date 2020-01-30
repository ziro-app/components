import React from 'react'
import PropTypes from 'prop-types'
import Illustration from '../Illustration/index'
import { after, afterWelcome, wrapper, sellerCss, chargeCss, statusCss, dateCss, start, welcome, illustration, empty } from './styles'

const Timeline = ({ transactions }) =>
	<>
		<style>{after}</style>
		{transactions.map(({ seller, charge, status, date }, key) =>
			<div style={wrapper} className='timeline' key={key}>
				<label style={sellerCss}>{seller}</label>
				<label style={chargeCss}>{charge}</label>
				<label style={statusCss}>{status}</label>
				<label style={dateCss}>{date}</label>
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
	/** Array de transações do usuário. Cada transação possui dados como vendedor associado, valor, status e a data. */
	transactions: PropTypes.array.isRequired
}

export default Timeline