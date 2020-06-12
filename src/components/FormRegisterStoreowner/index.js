import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import maskInput from '@ziro/mask-input'
import capitalize from '@ziro/capitalize'
import Spinner from '../Spinner/index'
import Error from '../Error/index'
import GetCnpj from '../GetCnpj/index'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import Dropdown from '../Dropdown/index'

const FormRegisterStoreowner = ({ isLoading, setIsLoading, sendToBackend, hasAdvisor, hasAffiliated, haveSalesman, fetch, appAffiliateName = '', appAffiliateCpf = '', validCnaes, cnpjUrl, cnpjToken }) => {
	const [isError, setIsError] = useState(false)
	const [cnpjValid, setCnpjValid] = useState(false)
	const [storeowners, setStoreowners] = useState([])
	const [searchedName, setSearchedName] = useState('')
	// form fields
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [rg, setRg] = useState('')
	const [cpf, setCpf] = useState('')
	const [birth, setBirth] = useState('')
	const [insta, setInsta] = useState('')
	const [cnpj, setCnpj] = useState('')
	const [ie, setIe] = useState('')
	const [reason, setReason] = useState('')
	const [fantasia, setFantasia] = useState('')
	const [street, setStreet] = useState('')
	const [number, setNumber] = useState('')
	const [complement, setComplement] = useState('')
	const [neighborhood, setNeighborhood] = useState('')
	const [cep, setCep] = useState('')
	const [city, setCity] = useState('')
	const [cityState, setCityState] = useState('')
	const [fone, setFone] = useState('')
	const [whats, setWhats] = useState('')
	const [email, setEmail] = useState('')
	const [affiliateName, setAffiliateName] = useState('')
	const [affiliateCpf, setAffiliateCpf] = useState('')
	const [affiliates, setAffiliates] = useState([])
	const [advisor, setAdvisor] = useState('')
	const [advisors, setAdvisors] = useState([])
	const [salesman, setSalesman] = useState('')
	const [sellers, setSellers] = useState([])

	const setState = {
		setSearchedName, setAffiliateName, setAffiliateCpf, setAdvisor, setSalesman, setFname, setLname, setRg, setCpf, setBirth, setInsta, setCnpj, setIe, setReason, setFantasia,
		setStreet, setNumber, setComplement, setNeighborhood, setCep, setCity, setCityState, setFone, setWhats, setEmail, cnpjUrl, cnpjToken
	}
	const state = {
		appAffiliateName, appAffiliateCpf, affiliateName, affiliateCpf, advisor, salesman, fname, lname, rg, cpf, birth, insta, cnpj, ie, reason, fantasia,
		street, number, complement, neighborhood, cep, city, cityState, fone, whats, email, ...setState, cnpjValid
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
			validation: value => value === '' || !!value,
			value: rg,
			message: 'Campo obrigatório'
		}, {
			name: 'cpf',
			validation: value => value === '' || value.length === 14,
			value: cpf,
			message: 'Formato inválido'
		}, {
			name: 'birth',
			validation: value => value === '' || /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value),
			value: birth,
			message: 'Data inválida'
		},
		{
			name: 'reason',
			validation: value => !!value,
			value: reason,
			message: 'Campo obrigatório'
		}, {
			name: 'fantasia',
			validation: value => !!value,
			value: fantasia,
			message: 'Campo obrigatório'
		}, {
			name: 'street',
			validation: value => !!value,
			value: street,
			message: 'Campo obrigatório'
		}, {
			name: 'number',
			validation: value => !!value,
			value: number,
			message: 'Campo obrigatório'
		}, {
			name: 'neighborhood',
			validation: value => !!value,
			value: neighborhood,
			message: 'Campo obrigatório'
		}, {
			name: 'cep',
			validation: value => /(^\d{5}\-\d{3}$)|(^\d{2}\.\d{3}\-\d{3}$)/.test(value),
			value: cep,
			message: 'Formato inválido'
		}, {
			name: 'city',
			validation: value => !!value,
			value: city,
			message: 'Campo obrigatório'
		}, {
			name: 'cityState',
			validation: value => value.length === 2,
			value: cityState,
			message: 'Formato inválido'
		}, {
			name: 'fone',
			validation: value => value === '' || value.length >= 14,
			value: fone,
			message: 'Formato inválido'
		}, {
			name: 'whats',
			validation: value => /(^\(\d{2}\) \d{5}\-\d{4}$)/.test(value),
			value: whats,
			message: 'Formato inválido'
		}, {
			name: 'email',
			validation: value => /^\S+@\S+\.\S+$/g.test(value), // tests for pattern a@b.c
			value: email,
			message: 'Formato inválido'
		}, {
			name: 'affiliate',
			validation: value => hasAffiliated ? value === 'NENHUM' || affiliates.find(affiliate => affiliate[1] === value) : true,
			value: affiliateName,
			message: 'Afiliado(a) inválido(a)'
		}, {
			name: 'advisor',
			validation: value => hasAdvisor ? advisors.includes(value) : true,
			value: advisor,
			message: 'Assessor(a) inválido(a)'
		}, {
			name: 'salesman',
			validation: value => haveSalesman ? sellers.includes(value) : true,
			value: salesman,
			message: 'Vendedor(a) inválido(a)'
		}
	]
	if (isLoading) return <div style={{ display: 'grid' }}><Spinner size='5rem' /></div>
	if (isError) return <Error />
	return (
		<>
			<GetCnpj cnpj={cnpj} setState={setState} baseCnpj={storeowners} setCnpjValid={setCnpjValid} validCnaes={validCnaes} />
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
							inputMode='numeric'
						/>
					} />,
					<FormInput name='cpf' label='CPF' input={
						<InputText
							value={cpf}
							onChange={({ target: { value } }) => setCpf(maskInput(value, '###.###.###-##', true))}
							placeholder='000.111.222-33'
							inputMode='numeric'
						/>
					} />,
					<FormInput name='birth' label='Nascimento' input={
						<InputText
							value={birth}
							onChange={({ target: { value } }) => setBirth(maskInput(value, '##/##/####', true))}
							placeholder='01/01/1990'
							inputMode='numeric'
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
							inputMode='numeric'
						/>
					} />,
					<FormInput name='reason' label='Razão Social' input={
						<InputText
							value={reason}
							onChange={({ target: { value } }) => setReason(value.toUpperCase())}
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
					<FormInput name='street' label='Rua' input={
						<InputText
							value={street}
							onChange={({ target: { value } }) => setStreet(value.toUpperCase())}
							placeholder='R MARECHAL SILVA'
						/>
					} />,
					<FormInput name='number' label='Número' input={
						<InputText
							value={number}
							onChange={({ target: { value } }) => setNumber(maskInput(value.toUpperCase(), '######', true))}
							placeholder='117'
							inputMode='numeric'
						/>
					} />,
					<FormInput name='complement' label='Complemento' input={
						<InputText
							value={complement}
							onChange={({ target: { value } }) => setComplement(value.toUpperCase())}
							placeholder='BLOCO K'
						/>
					} />,
					<FormInput name='neighborhood' label='Bairro' input={
						<InputText
							value={neighborhood}
							onChange={({ target: { value } }) => setNeighborhood(value.toUpperCase())}
							placeholder='LAPA'
						/>
					} />,
					<FormInput name='cep' label='CEP' input={
						<InputText
							value={cep}
							onChange={({ target: { value } }) => setCep(maskInput(value, '##.###-###', true))}
							placeholder='01.123-110'
							inputMode='numeric'
						/>
					} />,
					<FormInput name='city' label='Cidade' input={
						<InputText
							value={city}
							onChange={({ target: { value } }) => setCity(value.toUpperCase())}
							placeholder='SÃO PAULO'
						/>
					} />,
					<FormInput name='cityState' label='Estado' input={
						<InputText
							value={cityState}
							onChange={({ target: { value } }) => setCityState(maskInput(value.toUpperCase(), '##', false))}
							placeholder='SP'
						/>
					} />,
					<FormInput name='fone' label='Telefone da loja' input={
						<InputText
							value={fone}
							onChange={({ target: { value } }) => setFone(maskInput(value, '(##) #####-####', true))}
							placeholder='(11) 91122-3344'
							inputMode='tel'
						/>
					} />,
					<FormInput name='whats' label='Whatsapp' input={
						<InputText
							value={whats}
							onChange={({ target: { value } }) => setWhats(maskInput(value, '(##) #####-####', true))}
							placeholder='(11) 91122-3344'
							inputMode='tel'
						/>
					} />,
					<FormInput name='email' label='Email' input={
						<InputText
							value={email}
							onChange={({ target: { value } }) => setEmail(value)}
							placeholder='email@gmail.com'
							inputMode='email'
							autoComplete='email'
						/>
					} />,
					hasAffiliated ? <FormInput name='affiliate' label='Afiliado(a)' input={
						<Dropdown
							value={searchedName}
							onChange={({ target: { value } }) => {
								if (value !== '' && value !== 'NENHUM') {
									setSearchedName(value)
									let person = affiliates.find(element => element[1] === value)
									if (person) {
										setAffiliateCpf(person[0])
										setAffiliateName(person[1])
									}
								} else {
									setSearchedName(value === 'NENHUM' ? 'NENHUM' : '')
									setAffiliateCpf('')
									setAffiliateName(value === 'NENHUM' ? 'NENHUM' : '')
								}
							}}
							onChangeKeyboard={element => {
								if (element && element.value !== 'NENHUM') {
									setSearchedName(element.value)
									let person = affiliates.find(affiliate => affiliate[1] === element.value)
									if (person) {
										setAffiliateCpf(person[0])
										setAffiliateName(person[1])
									}
								} else {
									setSearchedName(element.value === 'NENHUM' ? 'NENHUM' : '')
									setAffiliateCpf('')
									setAffiliateName(element.value === 'NENHUM' ? 'NENHUM' : '')
								}
							}
							}
							list={affiliates.map(affiliate => affiliate === 'NENHUM' ? 'NENHUM' : Object.values(affiliate)[1])}
							placeholder="Nome do(a) afiliado(a)"
							readOnly={false}
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

FormRegisterStoreowner.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	setIsLoading: PropTypes.func.isRequired,
	sendToBackend: PropTypes.func.isRequired,
	hasAdvisor: PropTypes.bool,
	hasAffiliated: PropTypes.bool,
	haveSalesman: PropTypes.bool,
	fetch: PropTypes.func.isRequired,
	appAffiliateName: PropTypes.string,
	appAffiliateCpf: PropTypes.string,
	validCnaes: PropTypes.array.isRequired,
	cnpjUrl: PropTypes.string.isRequired,
	cnpjToken: PropTypes.string.isRequired
}

export default FormRegisterStoreowner