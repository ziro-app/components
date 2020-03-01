import React from 'react'
import Button from '../../../components/Button/index'
import { containerWithPadding, fontTitle, fontSizeInput, primaryColor } from '@ziro/theme'

export const DisplayButton = () =>
	<div style={{...containerWithPadding, display: 'grid', gridRowGap: '30px', alignContent: 'start'}}>
		<Button type='submit' cta='Submit/Regular' template='regular' />
		<Button type='button' cta='Button/Destructive' template='destructive' />
		<Button type='link' cta='Link/Light' template='light' />
		<Button type='submit' cta='Disabled' template='light' submitting={true} />
		<Button type='submit' cta='Custom' template='light' style={{
			display: 'block',
			WebkitAppearance: 'none',
			WebkitTapHighlightColor: 'rgba(0,0,0,0)',
			MozAppearance: 'none',
			outline: 'none',
			cursor: 'pointer',
			width: '100%',
			padding: '10px 0px',
			border: `2px solid ${primaryColor}`,
			borderRadius: '5px',
			fontFamily: fontTitle,
			fontSize: fontSizeInput,
			color: primaryColor,
			textAlign: 'center',
			background: 'white'
		}} />
	</div>