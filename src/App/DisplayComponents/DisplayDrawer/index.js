import React, { useState, Fragment } from 'react'
import Drawer from '../../../components/Drawer/index'

export const DisplayDrawer = () => {
	const [isOpen, setIsOpen] = useState(true)
	return (
		<Fragment>
			<button onClick={() => setIsOpen(true)}>
				Open Drawer
			</button>
			<Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
				<div>Inside Drawer</div>
			</Drawer>
		</Fragment>
	)
}