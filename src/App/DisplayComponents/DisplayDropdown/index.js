import React, { useState } from 'react'
import Dropdown from '../../../components/Dropdown/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayDropdown = () => {
	const [selection, setSelection] = useState('')
	return (
		<div style={containerWithPadding}>
			<Dropdown
				readOnly={false}
				value={selection}
				onChange={({ target: { value } }) => setSelection(value)}
				list={['Apples', 'Bananas', 'Oranges', 'Melons', 'Berries']}
				placeholder='Escolha uma opção'
				onChangeKeyboard={element => element ? setSelection(element.value) : null }
				inputMode='numeric'
			/>
		</div>
	)
}