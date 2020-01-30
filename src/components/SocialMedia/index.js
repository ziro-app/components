import React from 'react'
import Icon from '../Icon/index'
import { container } from './styles'

const SocialMedia = () =>
	<div style={container}>
		<Icon type='facebook' style={{ cursor: 'pointer' }} size={24} onClick={
			() => window.open('https://facebook.com/ziromodabr', '_blank')
		}/>
		<Icon type='instagram' style={{ cursor: 'pointer' }} size={24} onClick={
			() => window.open('https://instagram.com/ziromoda', '_blank')
		}/>
		<Icon type='globe' style={{ cursor: 'pointer' }} size={24} onClick={
			() => window.open('https://ziromoda.com.br/ziroblog', '_blank')
		}/>
	</div>

export default SocialMedia