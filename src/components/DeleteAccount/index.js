import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import Button from '../Button/index'
import { containerWithPadding } from '@ziro/theme'

const DeleteAccount = ({ click }) =>
	<div style={containerWithPadding}>
		<Header type='icon-link' icon='back' navigateTo='/conta' title='Deletar conta' />
		<Button type='click' cta='Confirmar exclusão de conta' click={click} />
	</div>

DeleteAccount.propTypes = {
	click: PropTypes.func.isRequired
}

export default DeleteAccount