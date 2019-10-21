import React from 'react'
import { container, transaction, transaction2, transaction3, circle, circle2, circle3, status, status2, status3, supplier, value, date, quantity } from './styles'

const Timeline = () => {
	return (
		<>
			<div style={transaction}>
				<div style={status}>Em aberto</div>
				<div style={supplier}>Karmani</div>
				<div style={value}>R$ 7.238,55</div>
				<div style={date}>30/ago</div>
			</div>
			<div style={transaction2}>
				<div style={status2}>Confirmado</div>
				<div style={supplier}>Cor Doce</div>
				<div style={value}>R$ 3.998,12</div>
				<div style={date}>30/ago</div>
			</div>
			<div style={transaction3}>
				<div style={supplier}>La Chocolê</div>
				<div style={value}>R$ 5.372,43</div>
				<div style={date}>27/ago</div>
			</div>
			<div style={transaction3}>
				<div style={supplier}>Esmeral</div>
				<div style={value}>R$ 1.809,13</div>
				<div style={date}>27/ago</div>
			</div>
			<div style={transaction3}>
				<div style={supplier}>Salgunamu</div>
				<div style={value}>R$ 1.999,88</div>
				<div style={date}>27/ago</div>
			</div>
			<div style={transaction3}>
				<div style={supplier}>Jo Fashion</div>
				<div style={value}>R$ 2.341,70</div>
				<div style={date}>26/ago</div>
			</div>
			<div style={transaction3}>
				<div style={supplier}>Loubucca</div>
				<div style={value}>R$ 1.987,69</div>
				<div style={date}>26/ago</div>
			</div>
		</>
	)
}

export default Timeline