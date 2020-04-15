import React, { useState } from 'react'
import ToastNotification from '../../../components/ToastNotification/index'
import Button from '../../../components/Button/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayToastNotification = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [hide, setHide] = useState(false)
	return (
		<div style={containerWithPadding}>
			<div style={{ display: 'grid',marginBottom: '30px' }} onClick={() => setIsOpen(true)}>
				<Button type='submit' cta='Show Notification' />
			</div>
			<div style={{ display: 'grid' }} onClick={() => setHide(toggle => !toggle)}>
				<Button type='submit' cta={`${hide ? 'M' : 'Unm'}ount Toast`} />
			</div>
			{hide ? null :
				<ToastNotification isOpen={isOpen} setIsOpen={setIsOpen}>
					<label style={{display: 'grid',textAlign: 'center'}}>What is Lorem Ipsum?</label>
				</ToastNotification>
			}
		</div>
	)
}