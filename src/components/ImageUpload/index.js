import React from 'react'
import { dropzone, button, input, styleTag } from './styles'

const ImageUpload = () => {
	return (
		<div style={dropzone} className='dropzone'>
			<style>{styleTag}</style>
			<label>Arraste imagens ou escolha do dispositivo</label>
			<label for='input-file' style={button}>Escolher</label>
			<input
				style={input}
				type='file'
				multiple={true}
				id='input-file'
			/>
		</div>
	)
}

export default ImageUpload