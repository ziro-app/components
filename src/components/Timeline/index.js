import React from 'react'
import PropTypes from 'prop-types'
import { after, wrapper, sellerCss, chargeCss, statusCss, dateCss } from './styles'

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
	</>

Timeline.propTypes = {
	transactions: PropTypes.array.isRequired
}

export default Timeline