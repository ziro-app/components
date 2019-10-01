import React, { useState, Fragment } from 'react'
import { motion } from 'framer-motion'
import InputText from '../InputText'
import { modal, data } from './styles'

const Dropdown = () => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<Fragment>
			<InputText onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)} />
			{isOpen && <motion.div style={modal} initial={{ opacity: 0, height: '0' }} animate={{ opacity: 1, height: '120px' }}>
				<label style={data}>1x 100.000,00 = R$100.000,00</label>
				<label style={data}>2x 50.000,00 = R$100.000,00</label>
				<label style={data}>3x 33.333,33 = R$100.000,00</label>
				<label style={data}>4x 25.000,00 = R$100.000,00</label>
				<label style={data}>5x 20.000,00 = R$100.000,00</label>
				<label style={data}>6x 16.666,66 = R$100.000,00</label>
			</motion.div>}
		</Fragment>
	)
}

export default Dropdown