import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import InputText from '../InputText'
import { container, modal, data } from './styles'

const Dropdown = ({ value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div style={container}>
			<InputText
				value={value}
				placeholder='Escolha quantas parcelas'
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
			/>
			{isOpen && <motion.div style={modal} initial={{ opacity: 0, height: '0' }} animate={{ opacity: 1, height: '120px' }} transition={{ type: 'spring', stiffness: '800', damping: '48' }}>
				<label style={data} onClick={() => console.log('hello')}>1x 100.000,00 = R$100.000,00</label>
				<label style={data} onClick={() => console.log('hello')}>2x 50.000,00 = R$100.000,00</label>
				<label style={data} onClick={() => console.log('hello')}>3x 33.333,33 = R$100.000,00</label>
				<label style={data} onClick={() => console.log('hello')}>4x 25.000,00 = R$100.000,00</label>
				<label style={data} onClick={() => console.log('hello')}>5x 20.000,00 = R$100.000,00</label>
				<label style={data} onClick={() => console.log('hello')}>6x 16.666,66 = R$100.000,00</label>
			</motion.div>}
		</div>
	)
}

Dropdown.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}

export default Dropdown