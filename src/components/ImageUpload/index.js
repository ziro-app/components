import React from 'react'
import { motion } from 'framer-motion'
import { dropzone, button, input, styleTag } from './styles'

const ImageUpload = () => {
	return (
		<div style={dropzone} className='dropzone'>
			<style>{styleTag}</style>
			<label>Arraste imagens ou escolha do dispositivo</label>
			<motion.label
				style={button}
				for='input-file'
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

export default ImageUpload