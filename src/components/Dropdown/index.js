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
				<option style={data} onMouseDown={onChange}>1x 100.000,00 = R$100.000,00</option>
				<option style={data} onMouseDown={onChange}>2x 50.000,00 = R$100.000,00</option>
				<option style={data} onMouseDown={onChange}>3x 33.333,33 = R$100.000,00</option>
				<option style={data} onMouseDown={onChange}>4x 25.000,00 = R$100.000,00</option>
				<option style={data} onMouseDown={onChange}>5x 20.000,00 = R$100.000,00</option>
				<option style={data} onMouseDown={onChange}>6x 16.666,66 = R$100.000,00</option>
			</motion.div>}
		</div>
	)
}

Dropdown.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}

export default Dropdown