import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { dropzone, instructions, button, btnDisabled, input, styleTag } from './styles'

const ImageUpload = ({ sendToBackend, isDisabled = false }) => {
	const handleDragEnter = e => {
		e.preventDefault()
		e.stopPropagation()
	}
	const handleDragLeave = e => {
		e.preventDefault()
		e.stopPropagation()
	}
	const handleDragOver = e => {
		e.preventDefault()
		e.stopPropagation()
	}
	const handleDrop = async e => {
		e.preventDefault()
		e.stopPropagation()
		if (!isDisabled) await sendToBackend(Array.from(e.dataTransfer.files))
	}
	const handleChange = async e => {
		if (!isDisabled) await sendToBackend(Array.from(e.target.files))
	}
	return (
		<div
			style={dropzone}
			className='dropzone'
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onChange={handleChange}
		>
			<style>{styleTag}</style>
			<label style={instructions}>Arraste imagens ou escolha do dispositivo</label>
			<motion.label
				style={isDisabled ? btnDisabled : button}
				htmlFor='input-file'
				whileTap={isDisabled ? null : { scale: 0.95 }}
				>Escolher
			</motion.label>
			<input
				disabled={isDisabled}
				style={input}
				id='input-file'
				type='file'
				multiple={true}
			/>
		</div>
	)
}

ImageUpload.propTypes = {
	sendToBackend: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool
}

export default ImageUpload
