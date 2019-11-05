import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Icon from '../Icon'
import InputText from '../InputText'
import { grayColor1 } from '../../Theme/variables'
import { container, close, modal, data } from './styles'

const Dropdown = ({ value, onChange, list, submitting, placeholder }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isSelected, setIsSelected] = useState(false)
	const [cursorPosition, setCursorPosition] = useState(1)
	const onKeyDown = ({ key }) => {
		if (isOpen && key === 'ArrowDown') setCursorPosition(prevPosition => {
			if (prevPosition < list.length)
				return prevPosition + 1
			return prevPosition
		})
	}
	const onKeyUp = ({ key }) => {
		if (isOpen && key === 'ArrowUp') setCursorPosition(prevPosition => {
			if (prevPosition > 1)
				return prevPosition - 1
			return prevPosition
		})
	}
	useEffect(() => {
		window.addEventListener('keydown', onKeyDown)
		window.addEventListener('keyup', onKeyUp)
		return () => {
			window.removeEventListener('keydown', onKeyDown)
			window.removeEventListener('keyup', onKeyUp)
		}
	}, [isOpen])
	useEffect(() => {
		console.log(cursorPosition)
	}, [cursorPosition])
	const handleSelection = event => {
		setIsSelected(true)
		onChange(event)
	}
	const clearSelection = () => {
		const event = { target: { value: '' } }
		setIsSelected(false)
		onChange(event)
	}
	return (
		<div style={container}>
			{isSelected &&
			<div style={close} onClick={clearSelection}>
				<Icon type='close' size={16} color={grayColor1} />
			</div>}
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
				{list.map(item => <input style={data} value={item} onMouseDown={handleSelection} key={item} readOnly={true} />)}
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