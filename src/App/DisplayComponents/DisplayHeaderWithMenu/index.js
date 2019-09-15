import React, { useState } from 'react'
import HeaderWithMenu from '../../../components/HeaderWithMenu/index'

export const DisplayHeaderWithMenu = () => {
	const [isOpen, setIsOpen] = useState(true)
	return <HeaderWithMenu title='Meus Dados' setIsOpen={() => setIsOpen(true)} />
}