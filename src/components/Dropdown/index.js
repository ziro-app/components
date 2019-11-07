import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Icon from '../Icon'
import InputText from '../InputText'
import { grayColor1 } from '../../Theme/variables'
import { container, close, modal, data } from './styles'
import { initial, animate, transition } from './animation'

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
	/* allow keyboard navigation and using enter to select item from list */
	const [cursorPosition, setCursorPosition] = useState(null)
	const [enter, setEnter] = useState(false)
	const onKeyPress = ({ key }) => {
		if (isOpen) {
			if (key === 'ArrowDown') setCursorPosition(prevPosition => {
				if (prevPosition === null)
					return 0
				if (prevPosition < list.length - 1)
					return prevPosition + 1
				return prevPosition
			})
			if (key === 'ArrowUp') setCursorPosition(prevPosition => {
				if (prevPosition > 0)
					return prevPosition - 1
				return prevPosition
			})
			if (key === 'Enter') {
				setIsSelected(true)
				setEnter(true)
				setIsOpen(false)
				document.activeElement.blur()
			}
		}
	}
	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyPress)
			return () => window.removeEventListener('keydown', onKeyPress)
		} else {
			setCursorPosition(null)
			setEnter(false)
		}
	}, [isOpen])
	useEffect(() => {
		onChangeKeyboard(document.getElementById(cursorPosition))
	}, [enter])
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
			<motion.div style={modal} initial={initial} animate={animate} transition={transition}>
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