import React from 'react'
import { motion } from 'framer-motion'
import { dropzone, button, input, styleTag } from './styles'

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
		const result = await sendToBackend(e.dataTransfer.files)
		console.log(result)
	}
	return (
		<div
			style={dropzone}
			className='dropzone'
			onDragEnter={e => handleDragEnter(e)}
			onDragLeave={e => handleDragLeave(e)}
			onDragOver={e => handleDragOver(e)}
			onDrop={e => handleDrop(e)}
		>
			<style>{styleTag}</style>
			<label>Arraste imagens ou escolha do dispositivo</label>
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