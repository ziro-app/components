import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import InputText from '../InputText'
import { container, modal, data } from './styles'

const Dropdown = ({ value, onChange, list, submitting, placeholder }) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div style={container}>
			<InputText
				readOnly={true}
				value={value}
				submitting={submitting}
				onFocus={submitting ? null : () => setIsOpen(true)}
				onBlur={submitting ? null : () => setIsOpen(false)}
				placeholder={placeholder}
			/>
			{isOpen &&
			<motion.div style={modal} initial={{ opacity: 0, height: '0' }} animate={{ opacity: 1, height: '120px' }} transition={{ type: 'spring', stiffness: '800', damping: '48' }}>
				{list.map(item => <option style={data} onMouseDown={onChange} key={item}>{item}</option>)}
			</motion.div>}
		</div>
	)
}

Dropdown.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	list: PropTypes.array.isRequired,
	submitting: PropTypes.bool,
	placeholder: PropTypes.string
}

export default Dropdown