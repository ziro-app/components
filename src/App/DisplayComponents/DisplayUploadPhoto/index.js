import React, { useState, useMemo } from 'react'
import Header from '../../../components/Header/index'
import UploadPhoto from '../../../components/UploadPhoto'
import { containerWithPadding } from '@ziro/theme'

export const DisplayUploadPhoto = () => {

	const [picture, setPicture] = useState()

	return (
		<div style={containerWithPadding}>
			<Header type='title-only' title='Upload do documento'/>
			<UploadPhoto
				picture={picture}
				setPicture={setPicture}
			/>
		</div>
	)

}