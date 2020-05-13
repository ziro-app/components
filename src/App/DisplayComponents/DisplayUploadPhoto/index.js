import React, { useState, useMemo } from 'react'
import Header from '../../../components/Header/index'
import UploadPhoto from '../../../components/FlowUploadPhoto'
import FlowManager from '../../../components/FlowManager'
import { containerWithPadding } from '@ziro/theme'

export const DisplayUploadPhoto = () => {

	const [picture, setPicture] = useState()

	return (
		<FlowManager>
			<div style={containerWithPadding}>
				<Header type='title-only' title='Upload do documento'/>
				<UploadPhoto
					title="Documento do portador"
					modal={{
					illustration: 'profileData',
					title: 'Documento do portador',
					message: (
						<label>
						Faça upload do <strong>DOCUMENTO DO PORTADOR DO CARTÃO</strong> contendo CPF e uma foto
						</label>
					),
					}}
					picture={picture}
					setPicture={setPicture}
				/>
			</div>
		</FlowManager>
	)

}