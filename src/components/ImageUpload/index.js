import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { dropzone, instructions, button, input, styleTag } from './styles'

const ImageUpload = ({ sendToBackend }) => {
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
		try {
			const result = await sendToBackend(Array.from(e.dataTransfer.files))
			console.log(result)
		} catch (error) {
			console.log(error)
		}
	}
	const handleChange = async e => {
		try {
			const result = await sendToBackend(Array.from(e.target.files))
			console.log(result)
		} catch (error) {
			console.log(error)
		}
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
				style={button}
				htmlFor='input-file'
				whileTap={{ scale: 0.95 }}
				>Escolher
			</motion.label>
			<input
				style={input}
				id='input-file'
				type='file'
				multiple={true}
			/>
		</div>
	)
}

ImageUpload.propTypes = {
	sendToBackend: PropTypes.func.isRequired
}

export default ImageUpload