import React from 'react'
import Logo from '../Logo/index'
import Button from '../Button/index'
import MapBox from '../MapBox/index'
import Icon from '../Icon/index'
import phones from './phones.png'
import choose from './choose.png'
import logistics from './logistics.png'
import phoneSuppliers from './phone-suppliers.png'
import pay from './pay.png'
import { container, header, name, hero, heroCall, marker, heroText, heroImg, button, benefits, benefitsImg,
	benefitsCall, benefitsText, suppliers, supplierText, clients, bar, testimonial, client,
	steps, title, step, number, block, stepCall, stepText, location, address, social } from './styles'

const Landing = () => {
	return (
		<div style={container}>
			<div style={header}>
				<Logo size={40} />
				<p style={name}>ZIRO</p>
			</div>
			<div style={hero}>
				<p style={heroCall}>Compre sem dificuldade roupas femininas para revender<span style={marker}></span></p>
				<p style={heroText}>A Ziro facilita na escolha de fornecedores, no despacho e no pagamento da sua mercadoria</p>
				<div style={button}><Button type='submit' cta='Fale conosco' /></div>
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
			<div style={suppliers}>
				<div style={title}>Escolha sem limites</div>
				<p style={supplierText}>
					Você pode comprar de qualquer fornecedor de São Paulo
					<br/>
					Se não encontrar em nosso catálogo, nós vamos atrás para você
				</p>
				<img style={heroImg} src={phoneSuppliers} />
				<div style={button}><Button type='submit' cta='Ver catálogo' /></div>
			</div>
			<div style={clients}>
				<div style={title}>Palavra de cliente</div>
				<div style={bar} />
				<p style={testimonial}>"Não me preocupo em carregar sacolas, não fica mercadoria para trás e tenho tempo para ir em mais lojas!"</p>
				<p style={client}>&mdash;&mdash; Edileuza</p>
				<div style={bar} />
				<p style={testimonial}>"Pagar normalmente demora tanto, mas com a Ziro é mais rápido"</p>
				<p style={client}>&mdash;&mdash; Azuelos</p>
				<div style={bar} />
				<p style={testimonial}>"Cheguei perdida no Bom Retiro, a Ziro me deu um norte e me ajudou a escolher"</p>
				<p style={client}>&mdash;&mdash; Maria</p>
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
						<p style={stepText}>Rastreie suas mercadorias pelo app, sabendo que foram despachadas no melhor preço</p>
					</div>
				</div>
			</div>
			<div style={location}>
				<div style={title}>Comece agora...</div>
				<div style={button}><Button type='submit' cta='Acessar app' /></div>
				<div style={title}>...Ou venha nos conhecer</div>
				<div>
					<p style={address}>R. Lubavitch, 71, Bom Retiro</p>
					<p style={address}>01123-110, São Paulo - SP</p>
				</div>
				<MapBox />
				<div style={social}>
					<Icon type='facebook' size={24} />
					<Icon type='instagram' size={24} />
				</div>
				<label>&copy; Copyright {new Date().getFullYear()} Ziro</label>
			</div>
		</div>
	)
}

export default Landing