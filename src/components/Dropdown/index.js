import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import InputText from '../InputText'
import { container, modal, data } from './styles'

const Dropdown = ({ value, onSelect, list }) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div style={container}>
			<InputText
				readOnly={true}
				value={value}
				placeholder='Escolha quantas parcelas'
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
			/>
			{isOpen &&
			<motion.div style={modal} initial={{ opacity: 0, height: '0' }} animate={{ opacity: 1, height: '120px' }} transition={{ type: 'spring', stiffness: '800', damping: '48' }}>
				{list.map(item => <option style={data} onMouseDown={onSelect} key={item}>{item}</option>)}
			</motion.div>}
		</div>
	)
}

Dropdown.propTypes = {
	value: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
	list: PropTypes.array.isRequired
}

export default Dropdown