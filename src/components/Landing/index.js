import React from 'react'
import Logo from '../Logo/index'
import phones from './phones.png'
import choose from './choose.png'
import logistics from './logistics.png'
import pay from './pay.png'
import { container, header, name, hero, heroCall, heroText, heroImg,
	benefits, benefitsImg, benefitsCall, benefitsText, clients, bar, testimonial, client,
	steps, title, step, number, block, stepCall, stepText } from './styles'

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
				<p style={benefitsCall}>Logística que dá pra confiar</p>
				<p style={benefitsText}>Buscamos sua mercadoria em cada fabricante, unificamos e despachamos no melhor preço</p>
			</div>
			<div style={benefits}>	
				<img style={benefitsImg} src={pay} />
				<p style={benefitsCall}>Pagamento sem burocracia</p>
				<p style={benefitsText}>Aprovamos sua compra em poucos minutos, com parcelamento em 6x s/ juros</p>
			</div>
			<div style={clients}>
				<div style={title}>Palavra de cliente</div>
				<div style={bar} />
				<p style={testimonial}>"Não me preocupo em carregar sacolas, não fica mercadoria para trás e tenho tempo para ir em mais lojas!"</p>
				<p style={client}>&mdash;&mdash; Edileuza</p>
			</div>
			<div style={steps}>
				<div style={title}>Veja como é simples</div>
				<div style={step}>
					<label style={number}>1</label>
					<div style={block}>
						<p style={stepCall}>Baixe o app</p>
						<p style={stepText}>Fale com nosso assessor para receber curadoria de fabricantes</p>
					</div>
				</div>
				<div style={step}>
					<label style={number}>2</label>
					<div style={block}>
						<p style={stepCall}>Escolha as peças</p>
						<p style={stepText}>Feche pedido no fabricante desejado, usando o app</p>
					</div>
				</div>
				<div style={step}>
					<label style={number}>3</label>
					<div style={block}>
						<p style={stepCall}>Pague sua compra</p>
						<p style={stepText}>Pague com conveniência e segurança direto do app</p>
					</div>
				</div>
				<div style={step}>
					<label style={number}>4</label>
					<div style={block}>
						<p style={stepCall}>Repita o processo</p>
						<p style={stepText}>Compre aonde quiser, juntaremos todas as suas mercadorias para despacho</p>
					</div>
				</div>
				<div style={step}>
					<label style={number}>5</label>
					<div style={block}>
						<p style={stepCall}>Pronto!</p>
						<p style={stepText}>Rastreie suas mercadorias pelo app, sabendo que foi despachada no melhor preço</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Landing