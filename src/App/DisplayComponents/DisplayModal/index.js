import React, { useState, useEffect } from 'react'
import Modal from '../../../components/Modal/index'
import Button from '../../../components/Button/index'
import Icon from '../../../components/Icon/index'
import { container } from '@ziro/theme'
import { boxStyle, imgStyle, controls } from './styles'

export const DisplayModal = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [degrees, setDegrees] = useState(0)
	const [scale, setScale] = useState(1)
	useEffect(() => {
		setDegrees(0)
		setScale(1)
	},[isOpen])
	return (
		<div style={container}>
			<div style={{ display: 'grid' }} onClick={() => setIsOpen(true)}><Button type='submit' cta='Open Modal' /></div>
			<Modal boxStyle={boxStyle} degrees={degrees} scale={scale} isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
				<img style={imgStyle} src='https://firebasestorage.googleapis.com/v0/b/ziro-app-data.appspot.com/o/Boletos%2F54049-1591102892730?alt=media&token=b8f1308c-4861-4b11-a0db-56bcfe4c37f7' alt={'Imagem do Boleto'} />
			</Modal>
			{isOpen && <div style={controls}>
				<Icon type='id' size={50} onClick={() => setDegrees(degrees => degrees - 90)} />
				<Icon type='email' size={50} onClick={() => setScale(scale => scale === 1.7 ? 1 : 1.7)} />
				<Icon type='close' size={50} onClick={() => setIsOpen(false)} />
			</div>}
		</div>
	)
}
