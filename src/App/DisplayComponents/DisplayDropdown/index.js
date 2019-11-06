import React, { useState } from 'react'
import Dropdown from '../../../components/Dropdown/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayDropdown = () => {
	const [selection, setSelection] = useState('')
	return (
		<div style={containerWithPadding}>
			<Dropdown
				value={selection}
				onChange={({ target: { value } }) => setSelection(value)}
				list={['Apples', 'Bananas', 'Oranges', 'Melons', 'Berries']}
				placeholder='Escolha uma opção'
				onChangeKeyboard={(value) => console.log(value)}
			/>
		</div>
	)
}