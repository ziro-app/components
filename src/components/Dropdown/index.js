import React, { useState, Fragment } from 'react'
import InputText from '../InputText'
import { data } from './styles'

const Dropdown = () => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<Fragment>
			<InputText onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)} />
			{isOpen && <div style={data}>
				<label>Option 1</label>
			</div>}
		</Fragment>
	)
}

export default Dropdown