import React, { useState } from 'react'
import ToastNotification from '../../../components/ToastNotification/index'
import Button from '../../../components/Button/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayToastNotification = () => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div style={containerWithPadding}>
			<div style={{ display: 'grid' }} onClick={() => setIsOpen(true)}>
				<Button type='submit' cta='Show Notification' />
			</div>
			<ToastNotification isOpen={isOpen} setIsOpen={setIsOpen}>
				<label style={{display: 'grid',textAlign: 'center'}}>What is Lorem Ipsum?</label>
			</ToastNotification>
		</div>
	)
}