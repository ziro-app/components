import React, { useState, useEffect } from 'react'
import Modal from '../../../components/Modal/index'
import Button from '../../../components/Button/index'
import CameraButton from '../../../components/CameraButton/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayModal = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [degrees, setDegrees] = useState(-90)
	const [counter, setCounter] = useState(0)

	useEffect(() => setDegrees(degrees + 90), [counter])
	return (
		<div style={containerWithPadding}>
			<div style={{ display: 'grid' }} onClick={() => setIsOpen(true)}><Button type='submit' cta='Open Modal' /></div>
			<Modal degrees={degrees} isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
				<div style={{ position: 'relative' }}>
					<img style={{ display: 'block', width: '100%' }} src='https://firebasestorage.googleapis.com/v0/b/ziro-app-data.appspot.com/o/Boletos%2F54049-1591102892730?alt=media&token=b8f1308c-4861-4b11-a0db-56bcfe4c37f7' alt={'Imagem do Boleto'} />
					<div style={{
						position: 'absolute',
						overflow: 'hidden',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0
					}}>
						<CameraButton size={25} click={() => setCounter(counter + 1)} type='swap' />
					</div>
				</div>
			</Modal>

		</div>
	)
}
