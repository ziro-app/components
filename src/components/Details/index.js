import React from 'react'
import PropTypes from 'prop-types'
import { container, infoBlock, header, body, info, title, content } from './styles'

const Details = props => {
	return (
		<div style={container}>
			<div style={infoBlock}>
				<label style={header}>Compra</label>
				<div style={body}>
					<div style={info}>
						<label style={title}>Marca</label>
						<label style={content}>Crisfael</label>
					</div>
					<div style={info}>
						<label style={title}>Valor</label>
						<label style={content}>3000,33</label>
					</div>
				</div>
			</div>
			<div style={infoBlock}>
				<label style={header}>Cartão</label>
				<div style={body}>
					<div style={info}>
						<label style={title}>Bandeira</label>
						<label style={content}>Mastercard</label>
					</div>
					<div style={info}>
						<label style={title}>Número</label>
						<label style={content}>4444...1111</label>
					</div>
				</div>
			</div>
		</div>
	)
}

Details.propTypes = {

}

export default Details