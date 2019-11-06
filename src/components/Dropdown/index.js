import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Icon from '../Icon'
import InputText from '../InputText'
import { grayColor1 } from '../../Theme/variables'
import { container, close, modal, data } from './styles'

const Dropdown = ({ value, onChange, list, submitting, placeholder, onChangeKeyboard }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isSelected, setIsSelected] = useState(false)
	const handleSelection = event => {
		setIsSelected(true)
		onChange(event)
	}
	const clearSelection = () => {
		const event = { target: { value: '' } }
		setIsSelected(false)
		onChange(event)
	}
	/* allow keyboard navigation */
	const [cursorPosition, setCursorPosition] = useState(null)
	const onKeyDown = ({ key }) => {
		if (isOpen && key === 'ArrowDown') setCursorPosition(prevPosition => {
			if (prevPosition === null)
				return 0
			if (prevPosition < list.length - 1)
				return prevPosition + 1
			return prevPosition
		})
	}
	const onKeyUp = ({ key }) => {
		if (isOpen && key === 'ArrowUp') setCursorPosition(prevPosition => {
			if (prevPosition > 0)
				return prevPosition - 1
			return prevPosition
		})
	}
	const onKeyEnter = ({ key }) => {
		if (isOpen && key === 'Enter')
			onChangeKeyboard(document.getElementById(cursorPosition))
	}
	useEffect(() => {
		if (!isOpen) setCursorPosition(null)
		window.addEventListener('keydown', onKeyDown)
		window.addEventListener('keyup', onKeyUp)
		if (onChangeKeyboard) window.addEventListener('return', onKeyEnter)
		return () => {
			window.removeEventListener('keydown', onKeyDown)
			window.removeEventListener('keyup', onKeyUp)
			if (onChangeKeyboard) window.removeEventListener('enter', onKeyEnter)
		}
	}, [isOpen])
	/* allow scrolling the list when using the keyboard */
	useEffect(() => {
		if (cursorPosition)
			document.getElementById(cursorPosition).scrollIntoView(false)
	}, [cursorPosition])
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
				{list.map((item, index) =>
					<input
						style={data(cursorPosition === index)}
						value={item}
						onMouseDown={handleSelection}
						key={item}
						id={index}
						readOnly={true}
					/>)}
			</motion.div>}
		</div>
	)
}

Dropdown.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	list: PropTypes.array.isRequired,
	submitting: PropTypes.bool,
	placeholder: PropTypes.string,
	onChangeKeyboard: PropTypes.func
}

export default Dropdown