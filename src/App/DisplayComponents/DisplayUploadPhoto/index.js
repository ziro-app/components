import React, { useState, useMemo } from 'react'
import Header from '../../../components/Header/index'
import UploadPhoto from '../../../components/FlowUploadPhoto'
import FlowManager from '../../../components/FlowManager'
import { containerWithPadding } from '@ziro/theme'
import TooltipHelp from '@bit/vitorbarbosa19.ziro.tooltip-help'

export const DisplayUploadPhoto = () => {

	const [picture, setPicture] = useState()

	const instructions = useMemo(() => (
		<>
				<label>Envie uma foto da mesma pessoa que está no documento enviado anteriormente. </label>
				<label>A foto precisa estar bem enquadrada e com boa iluminação</label>
				<TooltipHelp
						illustration="cnhPhoto"
						illustrationSize={150}
						title='Por que enviar uma foto?'
						body='Esse é um procedimento de segurança que visa combater fraudes,
						evitando uso não autorizado do cartão. Não salvamos sua foto conosco,
						e você só precisa fazer esse procedimento uma vez por cartão.'
				/>
		</>
	), [])

	return (
		<FlowManager>
			<div style={containerWithPadding}>
				<Header type='title-only' title='Upload do documento'/>
				<UploadPhoto
					title="Documento do portador"
					modal={{
					illustration: 'cnhPhoto',
					title: 'Documento do portador',
					message: (
						<label>
						Faça upload do <strong>DOCUMENTO DO PORTADOR DO CARTÃO</strong> contendo CPF e uma foto
						</label>
					),
					}}
					picture={picture}
					setPicture={setPicture}
					instructions={instructions}
				/>
			</div>
		</FlowManager>
	)

}