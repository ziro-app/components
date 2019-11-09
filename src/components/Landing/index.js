import React from 'react'
import Logo from '../Logo/index'
import phones from './phones.png'
import choose from './choose.png'
import logistics from './logistics.png'
import pay from './pay.png'
import { container, header, name, hero, heroCall, heroText, heroImg, benefits, benefitsImg, benefitsCall, benefitsText } from './styles'

const Landing = () => {
	return (
		<div style={container}>
			<div style={header}>
				<Logo size={40} />
				<p style={name}>ZIRO</p>
			</div>
			<div style={hero}>
				<p style={heroCall}>Compre sem dificuldade roupas femininas para revender</p>
				<p style={heroText}>A Ziro facilita na escolha, no despacho e no pagamento da sua mercadoria</p>
				<img style={heroImg} src={phones} />
			</div>
			<div style={benefits}>
				<img style={benefitsImg} src={choose} />
				<p style={benefitsCall}>Escolha sem confusão</p>
				<p style={benefitsText}>Te indicamos os fabricantes que combinam com seu público-alvo, para que sua mercadoria não encalhe</p>
			</div>
			<div style={benefits}>
				<img style={benefitsImg} src={logistics} />
				<p style={benefitsCall}>Logística que você confia</p>
				<p style={benefitsText}>Buscamos sua mercadoria em cada fabricante, unificamos e despachamos no melhor preço</p>
			</div>
			<div style={benefits}>	
				<img style={benefitsImg} src={pay} />
				<p style={benefitsCall}>Pagamento sem burocracia</p>
				<p style={benefitsText}>Aprovamos sua compra em poucos minutos, com parcelamento em 6x s/ juros</p>
			</div>
		</div>
	)
}

export default Landing