import React, { useState, useEffect, useContext } from 'react'
import maskInput from '@ziro/mask-input'
import capitalize from '@ziro/capitalize'
import Spinner from '../Spinner/index'
import Error from '../Error/index'
import GetCnpj from './GetCnpj/index'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import Dropdown from '../Dropdown/index'

const FormRegisterStoreowner = ({ isLoading, setIsLoading, sendToBackend, hasAdvisor, hasAffiliated, haveSalesman, searchCnpj, fetch }) => {
	const [isError, setIsError] = useState(false)
	const [cnpjValid, setCnpjValid] = useState(false)
	const [storeowners, setStoreowners] = useState([])
	// form fields
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [rg, setRg] = useState('')
	const [cpf, setCpf] = useState('')
	const [birth, setBirth] = useState('')
	const [insta, setInsta] = useState('')
	const [cnpj, setCnpj] = useState('')
	const [ie, setIe] = useState('')
	const [razao, setRazao] = useState('')
	const [fantasia, setFantasia] = useState('')
	const [rua, setRua] = useState('')
	const [numero, setNumero] = useState('')
	const [complemento, setComplemento] = useState('')
	const [bairro, setBairro] = useState('')
	const [cep, setCep] = useState('')
	const [cidade, setCidade] = useState('')
	const [estado, setEstado] = useState('')
	const [fone, setFone] = useState('')
	const [email, setEmail] = useState('')
	const [affiliateName, setAffiliateName] = useState('')
	const [affiliateCpf, setAffiliateCpf] = useState('')
	const [affiliates, setAffiliates] = useState([{ 0: "279.601.038-44", 1: "Absolutti - Samuel Lima" }, { 0: "329.094.378-09", 1: "Mais Um - Karina Mota" }, { 0: "307.365.118-73", 1: "Duplo Sentido - Aline Vieira" }, { 0: "326.800.328-10", 1: "Duplo Sentido - Aline Maciel" }, { 0: "227.163.738-41", 1: "Averara - Amanda Guimarães" }, { 0: "372.655.338-01", 1: "Tuart - Maria Bizerra" }])
	const [advisor, setAdvisor] = useState('')
	const [advisors, setAdvisors] = useState([])
	const [salesman, setSalesman] = useState('')
	const [sellers, setSellers] = useState([])

	const setState = {
		setAffiliateName, setAffiliateCpf, setAdvisor, setSalesman, setFname, setLname, setRg, setCpf, setBirth, setInsta, setCnpj, setIe, setRazao, setFantasia,
		setRua, setNumero, setComplemento, setBairro, setCep, setCidade, setEstado, setFone, setEmail
	}
	const state = {
		affiliateName, affiliateCpf, advisor, salesman, fname, lname, rg, cpf, birth, insta, cnpj, ie, razao, fantasia,
		rua, numero, complemento, bairro, cep, cidade, estado, fone, email, ...setState, cnpjValid
	}
	useEffect(() => fetch(setIsLoading, setIsError, setStoreowners, setAdvisors, setAffiliates, setSellers), [])
	useEffect(() => setCnpjValid(false), [cnpj])
	const validations = [
		{
			name: 'fname',
			validation: value => !!value,
			value: fname,
			message: 'Campo obrigatório'
		}, {
			name: 'lname',
			validation: value => !!value,
			value: lname,
			message: 'Campo obrigatório'
		},
		{
			name: 'rg',
			validation: value => !!value,
			value: rg,
			message: 'Campo obrigatório'
		}, {
			name: 'cpf',
			validation: value => value.length === 14,
			value: cpf,
			message: 'Formato inválido'
		}, {
			name: 'birth',
			validation: value => /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value),
			value: birth,
			message: 'Data inválida'
		},
		{
			name: 'razao',
			validation: value => !!value,
			value: razao,
			message: 'Campo obrigatório'
		}, {
			name: 'fantasia',
			validation: value => !!value,
			value: fantasia,
			message: 'Campo obrigatório'
		}, {
			name: 'rua',
			validation: value => !!value,
			value: rua,
			message: 'Campo obrigatório'
		}, {
			name: 'numero',
			validation: value => !!value,
			value: numero,
			message: 'Campo obrigatório'
		}, {
			name: 'bairro',
			validation: value => !!value,
			value: bairro,
			message: 'Campo obrigatório'
		}, {
			name: 'cep',
			validation: value => value.length === 10,
			value: cep,
			message: 'Formato inválido'
		}, {
			name: 'cidade',
			validation: value => !!value,
			value: cidade,
			message: 'Campo obrigatório'
		}, {
			name: 'estado',
			validation: value => value.length === 2,
			value: estado,
			message: 'Formato inválido'
		}, {
			name: 'fone',
			validation: value => value.length >= 14,
			value: fone,
			message: 'Formato inválido'
		}, {
			name: 'email',
			validation: value => /^\S+@\S+\.\S+$/g.test(value), // tests for pattern a@b.c
			value: email,
			message: 'Formato inválido'
		}, {
			name: 'affiliate',
			validation: value => value === '' || affiliates.find(affiliate => affiliate[1] === value),
			value: affiliateName,
			message: 'Afiliado(a) inválido(a)'
		}, {
			name: 'advisor',
			validation: value => value === '' || advisors.includes(value),
			value: advisor,
			message: 'Assessor(a) inválido(a)'
		}, {
			name: 'salesman',
			validation: value => value === '' || sellers.includes(value),
			value: salesman,
			message: 'Vendedor(a) inválido(a)'
		}
	]
	if (isLoading) return <div style={{ display: 'grid' }}><Spinner size='5rem' /></div>
	if (isError) return <Error />
	return (
		<>
			<GetCnpj cnpj={cnpj} setState={setState} storeowners={storeowners} setCnpjValid={setCnpjValid} searchCnpj={searchCnpj} />
			<Form
				validations={validations}
				sendToBackend={sendToBackend ? sendToBackend(state) : () => null}
				inputs={[
					<FormInput name='fname' label='Nome' input={
						<InputText
							value={fname}
							onChange={({ target: { value } }) => setFname(capitalize(value))}
							placeholder='Nome do lojista'
						/>
					} />,
					<FormInput name='lname' label='Sobrenome' input={
						<InputText
							value={lname}
							onChange={({ target: { value } }) => setLname(capitalize(value))}
							placeholder='Sobrenome do lojista'
						/>
					} />,
					<FormInput name='rg' label='RG' input={
						<InputText
							value={rg}
							onChange={({ target: { value } }) => setRg(maskInput(value, '##############', true))}
							placeholder='00.111.222-3'
						/>
					} />,
					<FormInput name='cpf' label='CPF' input={
						<InputText
							value={cpf}
							onChange={({ target: { value } }) => setCpf(maskInput(value, '###.###.###-##', true))}
							placeholder='000.111.222-33'
						/>
					} />,
					<FormInput name='birth' label='Nascimento' input={
						<InputText
							value={birth}
							onChange={({ target: { value } }) => setBirth(maskInput(value, '##/##/####', true))}
							placeholder='01/01/1990'
						/>
					} />,
					<FormInput name='insta' label='Instagram da Loja' input={
						<InputText
							value={insta}
							onChange={({ target: { value } }) => setInsta(value)}
							placeholder='Ex.: ateliederoupa. Não use .com'
						/>
					} />,
					<FormInput name='ie' label='Inscrição Estadual' input={
						<InputText
							value={ie}
							onChange={({ target: { value } }) => setIe(maskInput(value, '#############', true))}
							placeholder='consulte pelo Sintegra'
						/>
					} />,
					<FormInput name='razao' label='Razão Social' input={
						<InputText
							value={razao}
							onChange={({ target: { value } }) => setRazao(value.toUpperCase())}
							placeholder='ALMEIDA MODAS LTDA'
						/>
					} />,
					<FormInput name='fantasia' label='Nome Fantasia' input={
						<InputText
							value={fantasia}
							onChange={({ target: { value } }) => setFantasia(value.toUpperCase())}
							placeholder='ATELIE DE ROUPAS'
						/>
					} />,
					<FormInput name='rua' label='Rua' input={
						<InputText
							value={rua}
							onChange={({ target: { value } }) => setRua(value.toUpperCase())}
							placeholder='R MARECHAL SILVA'
						/>
					} />,
					<FormInput name='numero' label='Número' input={
						<InputText
							value={numero}
							onChange={({ target: { value } }) => setNumero(maskInput(value.toUpperCase(), '######', true))}
							placeholder='117'
						/>
					} />,
					<FormInput name='complemento' label='Complemento' input={
						<InputText
							value={complemento}
							onChange={({ target: { value } }) => setComplemento(value.toUpperCase())}
							placeholder='BLOCO K'
						/>
					} />,
					<FormInput name='bairro' label='Bairro' input={
						<InputText
							value={bairro}
							onChange={({ target: { value } }) => setBairro(value.toUpperCase())}
							placeholder='LAPA'
						/>
					} />,
					<FormInput name='cep' label='CEP' input={
						<InputText
							value={cep}
							onChange={({ target: { value } }) => setCep(maskInput(value, '##.###-###', true))}
							placeholder='01.123-110'
						/>
					} />,
					<FormInput name='cidade' label='Cidade' input={
						<InputText
							value={cidade}
							onChange={({ target: { value } }) => setCidade(value.toUpperCase())}
							placeholder='SÃO PAULO'
						/>
					} />,
					<FormInput name='estado' label='Estado' input={
						<InputText
							value={estado}
							onChange={({ target: { value } }) => setEstado(maskInput(value.toUpperCase(), '##', false))}
							placeholder='SP'
						/>
					} />,
					<FormInput name='fone' label='Telefone' input={
						<InputText
							value={fone}
							onChange={({ target: { value } }) => setFone(maskInput(value, '(##) #####-####', true))}
							placeholder='(11) 91122-3344'
						/>
					} />,
					<FormInput name='email' label='Email' input={
						<InputText
							value={email}
							onChange={({ target: { value } }) => setEmail(value)}
							placeholder='email@gmail.com'
						/>
					} />,
					hasAffiliated ? <FormInput name='affiliate' label='Afiliado(a)' input={
						<Dropdown
							value={affiliateName}
							onChange={({ target: { value } }) => {
								if (value !== '') {
									let person = affiliates.find(element => element[1] === value)
									if (person) {
										setAffiliateCpf(person[0])
										setAffiliateName(person[1])
									}
								} else {
									setAffiliateCpf('')
									setAffiliateName('')
								}
							}}
							onChangeKeyboard={element => {
								if (element) {
									let person = affiliates.find(affiliate => affiliate[1] === element.value)
									if (person) {
										setAffiliateCpf(person[0])
										setAffiliateName(person[1])
									}
								} else {
									setAffiliateCpf('')
									setAffiliateName('')
								}
							}
							}
							list={affiliates.map(affiliate => Object.values(affiliate)[1])}
							placeholder="Nome do(a) afiliado(a)"
							readOnly={true}
						/>
					} /> : <FormInput label='' name='' input={<></>} />,
					hasAdvisor ? <FormInput name='advisor' label='Assessor(a)' input={
						<Dropdown
							value={advisor}
							onChange={({ target: { value } }) => setAdvisor(value)}
							onChangeKeyboard={element =>
								element ? setAdvisor(element.value) : null
							}
							list={advisors}
							placeholder="Nome do(a) assessor(a)"
							readOnly={true}
						/>
					} /> : <FormInput label='' name='' input={<></>} />,
					haveSalesman ? <FormInput name='salesman' label='Vendedor(a)' input={
						<Dropdown
							value={salesman}
							onChange={({ target: { value } }) => setSalesman(value)}
							onChangeKeyboard={element =>
								element ? setSalesman(element.value) : null
							}
							list={sellers}
							placeholder="Nome do(a) vendedor(a)"
							readOnly={true}
						/>
					} /> : <FormInput label='' name='' input={<></>} />
				]}
			/>
		</>
	)
}

export default FormRegisterStoreowner