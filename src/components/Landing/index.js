import React from 'react'
import Logo from '../Logo/index'
import phones from './phones.png'
import choose from './choose.png'
import logistics from './logistics.png'
import pay from './pay.png'
import { container, block, heroCall, heroText, heroImg, benefitsCall, benefitsText, benefitsImg } from './styles'

const Landing = () => {
	return (
		<div style={container}>
			<div style={block}>
				<Logo size={40} />
			</div>
			<div style={block}>
				<p style={heroCall}>Compre sem dificuldade roupas femininas para revender</p>
				<p style={heroText}>A Ziro facilita na escolha, no despacho e no pagamento da sua mercadoria</p>
				<img style={heroImg} src={phones} />
			</div>
			<div style={block}>
				<img style={benefitsImg} src={choose} />
				<p style={benefitsCall}>Escolha sem confusão</p>
				<p style={benefitsText}>Te indicamos os fabricantes que combinam com seu público-alvo, para que sua mercadoria não encalhe</p>
			</div>
			<div style={block}>
				<img style={benefitsImg} src={logistics} />
				<p style={benefitsCall}>Logística que você confia</p>
				<p style={benefitsText}>Buscamos sua mercadoria em cada fabricante, unificamos e despachamos no melhor preço</p>
			</div>
			<div style={block}>	
				<img style={benefitsImg} src={pay} />
				<p style={benefitsCall}>Pagamento sem burocracia</p>
				<p style={benefitsText}>Aprovação em poucos minutos, com parcelamento em 6x s/ juros</p>
			</div>
		</div>
	)
}

export default Landing