import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { filterOptions } from './filterOptions'
import Icon from '../Icon'
import InputText from '../InputText'
import { grayColor1 } from '@ziro/theme'
import { container, close, modal, data } from './styles'
import { initial, animate, transition } from './animation'

const Dropdown = ({ value, onChange, list, submitting, placeholder, onChangeKeyboard, readOnly }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [arrowDown, setArrowDown] = useState(false)
	const [arrowUp, setArrowUp] = useState(false)
	const [enter, setEnter] = useState(false)
	const [isSelected, setIsSelected] = useState(false)
	const [cursorPosition, setCursorPosition] = useState(null)
	const [options, setOptions] = useState([])
	const handleSelection = event => {
		setCursorPosition(null)
		onChange(event)
	}
	const clearSelection = () => {
		const event = { target: { value: '' } }
		onChange(event)
	}
	const onKeyPress = event => {
		if (isOpen) {
			if (event.key === 'ArrowDown') setArrowDown(true)
			if (event.key === 'ArrowUp') setArrowUp(true)
			if (event.key === 'Enter') {
				event.preventDefault() // prevent form submission if inside form tag
				setEnter(true)
			}
		}
	}
	useEffect(() => {
		setOptions(readOnly ? list : filterOptions(list, value))
		if (value) setIsSelected(true)
		else setIsSelected(false)
	}, [list, value])
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
		if (isOpen) {
			const maxPosition = options.length - 1
			if (arrowDown) {
				setCursorPosition(prevPosition => {
					if (prevPosition === null)
						return 0
					if (prevPosition < maxPosition)
						return prevPosition + 1
					return prevPosition
				})
				setArrowDown(false)
			}
			if (arrowUp) {
				setCursorPosition(prevPosition => {
					if (prevPosition > 0)
						return prevPosition - 1
					return prevPosition
				})
				setArrowUp(false)
			}
			if (enter) {
				setIsOpen(false)
				document.activeElement.blur()
				onChangeKeyboard(document.getElementById(cursorPosition))
				setEnter(false)
			}
		}
	}, [arrowDown, arrowUp, enter])
	/* allow scrolling the list when using the keyboard */
	useEffect(() => {
		if (cursorPosition) {
			const element = document.getElementById(cursorPosition)
			if (element) element.scrollIntoView(false)
		}
	}, [cursorPosition])
	return (
		<div style={container}>
			{isSelected &&
				<div style={close} onClick={clearSelection}>
					<Icon type='close' size={16} color={grayColor1} />
				</div>}
			<InputText
				readOnly={readOnly}
				onChange={handleSelection}
				value={value}
				submitting={submitting}
				onFocus={submitting ? null : () => setIsOpen(true)}
				onBlur={submitting ? null : () => setIsOpen(false)}
				placeholder={placeholder}
			/>
			{isOpen &&
				<motion.div style={modal} initial={initial} animate={animate} transition={transition}>
					{options.map((item, index) =>
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
	onChangeKeyboard: PropTypes.func,
	readOnly: PropTypes.bool
}

export default Dropdown