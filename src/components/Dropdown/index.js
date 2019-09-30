import React, { useState, Fragment } from 'react'
import { motion } from 'framer-motion'
import InputText from '../InputText'
import { data } from './styles'

const Dropdown = () => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<Fragment>
			<InputText onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)} />
			{isOpen && <motion.div style={data} initial={{ opacity: 0, height: '120px' }} animate={{ opacity: 1, height: '150px' }} transition={{ type: "spring", stiffness: 1500, damping: 70 }}>
				<label>Option 1</label>
				<label>Option 1</label>
				<label>Option 1</label>
				<label>Option 1</label>
				<label>Option 1</label>
			</motion.div>}
		</Fragment>
	)
}

export default Dropdown