import axios from 'axios';

const searchCnpj = state => () => {
    const { cnpj, suppliers, setCnpjValid, setStreet, setNumber,
        setComplement, setNeighborhood, setCep, setCity, setCityState,
        setReason, setFantasia, setAlertMessage, validCnaes, cnpjUrl, cnpjToken } = state;
    let config = {
        method: 'POST',
        url: cnpjUrl,
        data: { cnpj },
        headers: {
            'Authorization': cnpjToken
        }
    };
    return new Promise(async (resolve, reject) => {
        try {
            if (cnpj.length === 18) {
                if (!suppliers.includes(cnpj)) {
                    const { data: { status, result } } = await axios(config)
                    if (status) {
                        // validations
                        const cnaes = [...result.atividades_secundarias, result.atividade_principal].map(({ code }) => code)
                        const cnaeIsValid = !!cnaes.filter(code => code === '47.81-4-00' || validCnaes.includes(code)).pop()
                        if (!cnaeIsValid) throw { msg: 'CNPJ não tem CNAE válido', tryAgain: true }
                        const isActive = result.situacao === 'ATIVA'
                        if (!isActive) throw { msg: 'CNPJ não está ativo', tryAgain: true }
                        // fill form fields to save time for user
                        // Alinhar os campos que vou precisar aqui
                        setReason(result.nome)
                        setFantasia(result.fantasia)
                        setStreet(result.logradouro)
                        setNumber(result.numero)
                        setComplement(result.complemento)
                        setNeighborhood(result.bairro)
                        setCep(result.cep.replace('.', ''))
                        setCity(result.municipio)
                        setCityState(result.uf)

                        // resolve
                        setCnpjValid(true)
                        setAlertMessage('')
                        resolve('CNPJ válido')
                    } else throw { msg: 'CNPJ inválido na Receita', customError: true }
                } else {
                    setCnpjValid(false)
                    setAlertMessage('')
                    throw { msg: 'CNPJ já cadastrado', customError: true }
                }
            } else {
                setCnpjValid(false)
                setAlertMessage('')
                throw { msg: 'Deve ter 14 números', customError: true }
            }
        } catch (error) {
            // clear all fields
            console.log(error);
            setReason('');
            setFantasia('');
            if (error.tryAgain) {
                setAlertMessage('Aguarde um momento');
                config['data']['ignore_db'] = true;
                try {
                    // Continuar daqui, fazer a segunda request com o true (caso que dá erro)
                    console.log('Antes de fazer a segunda requisição')
                    const { data: { status, result } } = await axios(config)
                    if (status) {
                        // validations
                        console.log('Status ok na segunda')
                        const cnaes = [...result.atividades_secundarias, result.atividade_principal].map(({ code }) => code)
                        const cnaeIsValid = !!cnaes.filter(code => code === '47.81-4-00' || validCnaes.includes(code)).pop()
                        if (!cnaeIsValid) throw { msg: 'CNPJ não tem CNAE válido', finally: true }
                        const isActive = result.situacao === 'ATIVA'
                        if (!isActive) throw { msg: 'CNPJ não está ativo', finally: true }
                        // fill form fields to save time for user
                        // Alinhar os campos que vou precisar aqui
                        setReason(result.nome)
                        setFantasia(result.fantasia)
                        setStreet(result.logradouro)
                        setNumber(result.numero)
                        setComplement(result.complemento)
                        setNeighborhood(result.bairro)
                        setCep(result.cep.replace('.', ''))
                        setCity(result.municipio)
                        setCityState(result.uf)

                        // resolve
                        setCnpjValid(true)
                        setAlertMessage('')
                        resolve('CNPJ válido')
                    }
                } catch (error) {
                    console.log(error)
                    if (error.finally) {
                        setAlertMessage('');
                        reject('CNPJ ou CNAE inválido')
                    }
                    else {
                        // Colocar um timeout e fazer a última request
                        config['data']['ignore_db'] = false;
                        setAlertMessage('A validação é demorada, aguarde');
                        setTimeout(() => {
                            return new Promise(async (resolve, reject) => {
                                try {
                                    const { data: { status, result } } = await axios(config)
                                    if (status) {
                                        // validations
                                        const cnaes = [...result.atividades_secundarias, result.atividade_principal].map(({ code }) => code)
                                        const cnaeIsValid = !!cnaes.filter(code => code === '47.81-4-00' || validCnaes.includes(code)).pop()
                                        if (!cnaeIsValid) throw { msg: 'CNPJ não tem CNAE válido', finally: true }
                                        const isActive = result.situacao === 'ATIVA'
                                        if (!isActive) throw { msg: 'CNPJ não está ativo', finally: true }
                                        // fill form fields to save time for user
                                        // Alinhar os campos que vou precisar aqui
                                        setReason(result.nome)
                                        setFantasia(result.fantasia)
                                        setStreet(result.logradouro)
                                        setNumber(result.numero)
                                        setComplement(result.complemento)
                                        setNeighborhood(result.bairro)
                                        setCep(result.cep.replace('.', ''))
                                        setCity(result.municipio)
                                        setCityState(result.uf)

                                        // resolve
                                        setCnpjValid(true)
                                        setAlertMessage('')
                                        resolve('CNPJ válido')
                                    }
                                } catch (error) {
                                    reject('CNPJ ou CNAE inválido')
                                }
                            });
                        }, 25000);
                    }
                }
            }
            if (error.customError) reject(error);
            else {
                console.log(error);
                if (error.response) console.log(error.response);
                reject(error);
            }
        }
    });
};

export default searchCnpj