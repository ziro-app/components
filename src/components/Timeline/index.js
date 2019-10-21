import React from 'react'
import { transaction, status, pending, supplier, value, date, after } from './styles'

const Timeline = () => {
	return (
		<>
			<style>{after}</style>
			<div style={transaction} className='timeline'>
				<label style={pending}>Em aberto</label>
				<label style={supplier}>Karmani</label>
				<label style={value}>R$7.238,55</label>
				<label style={date}>30/ago</label>
			</div>
			<div style={transaction} className='timeline'>
				<label style={status}>Pago</label>
				<label style={supplier}>Cor Doce</label>
				<label style={value}>R$3.998,12</label>
				<label style={date}>30/ago</label>
			</div>
			<div style={transaction} className='timeline'>
				<label style={status}>Pago</label>
				<label style={supplier}>La Chocole</label>
				<label style={value}>R$5.372,43</label>
				<label style={date}>27/ago</label>
			</div>
			<div style={transaction} className='timeline'>
				<label style={status}>Pago</label>
				<label style={supplier}>Confeccoes Mauricio</label>
				<label style={value}>R$1.809,13</label>
				<label style={date}>27/ago</label>
			</div>
			<div style={transaction} className='timeline'>
				<label style={status}>Pago</label>
				<label style={supplier}>Salgunamu</label>
				<label style={value}>R$1.999,88</label>
				<label style={date}>27/ago</label>
			</div>
			<div style={transaction} className='timeline'>
				<label style={status}>Pago</label>
				<label style={supplier}>Jo Fashion</label>
				<label style={value}>R$2.341,70</label>
				<label style={date}>26/ago</label>
			</div>
			<div style={transaction} className='timeline'>
				<label style={status}>Pago</label>
				<label style={supplier}>Loubucca</label>
				<label style={value}>R$1.987,69</label>
				<label style={date}>26/ago</label>
			</div>
		</>
	)
}

export default Timeline