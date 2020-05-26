import axios from 'axios';

const lastReq = async (config, validCnaes) => {
    let result = {};
    try {
        const { data: { status, result } } = await axios(config);
        if (status) {
            const cnaes = [...result.atividades_secundarias, result.atividade_principal].map(({ code }) => code)
            const cnaeIsValid = !!cnaes.filter(code => validCnaes.includes(code)).pop()
            if (!cnaeIsValid) throw { msg: 'CNPJ não tem CNAE válido', customError: true }
            const isActive = result.situacao === 'ATIVA'
            if (!isActive) throw { msg: 'CNPJ não está ativo', customError: true }
            result['reason'] = result.nome;
            result['fantasia'] = result.fantasia;
            result['street'] = result.logradouro;
            result['number'] = result.numero;
            result['complement'] = result.complemento;
            result['neighborhood'] = result.bairro;
            result['cep'] = result.cep.replace('.', '');
            result['city'] = result.municipio;
            result['cityState'] = result.uf;
        } else result['error'] = { msg: 'CNPJ inválido na receita', customError: true };
    } catch (error) {
        result['error'] = error;
    } finally {
        return result;
    }
}

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
            try {
                try {
                    try {
                        if (cnpj.length === 18) {
                            if (!suppliers.includes(cnpj)) {
                                // 1º req, ignore_db = false
                                const { data: { status, result } } = await axios(config)
                                if (status) {
                                    // validations
                                    const cnaes = [...result.atividades_secundarias, result.atividade_principal].map(({ code }) => code);
                                    const cnaeIsValid = !!cnaes.filter(code => validCnaes.includes(code)).pop();
                                    // tryAgain -> prop usada p/ identificar a necessidade de outra req com ignore_db = true
                                    if (!cnaeIsValid) throw { msg: 'CNPJ não tem CNAE válido', tryAgain: true };
                                    const isActive = result.situacao === 'ATIVA';
                                    if (!isActive) throw { msg: 'CNPJ não está ativo', tryAgain: true };
                                    // fill form fields to save time for user
                                    // Alinhar os campos que vou precisar aqui
                                    setReason(result.nome);
                                    setFantasia(result.fantasia);
                                    setStreet(result.logradouro);
                                    setNumber(result.numero);
                                    setComplement(result.complemento);
                                    setNeighborhood(result.bairro);
                                    setCep(result.cep.replace('.', ''));
                                    setCity(result.municipio);
                                    setCityState(result.uf);

                                    // resolve
                                    setCnpjValid(true);
                                    setAlertMessage('');
                                    resolve('CNPJ válido');
                                } else throw { msg: 'CNPJ inválido na Receita', customError: true };
                            } else {
                                setCnpjValid(false);
                                setAlertMessage('');
                                throw { msg: 'CNPJ já cadastrado', customError: true };
                            }
                        } else {
                            setCnpjValid(false);
                            setAlertMessage('');
                            throw { msg: 'Deve ter 14 números', customError: true };
                        }
                    } catch (error) {
                        // Lança o erro para ser tratado nos próximos níveis
                        throw error;
                    }
                } catch (error) {
                    // Caso precise, realiza a 2º req. ignore_db = true
                    if (error.tryAgain) {
                        setReason('');
                        setFantasia('');
                        setAlertMessage('Aguarde um momento');
                        config['data']['ignore_db'] = true;
                        try {
                            try {
                                const { data: { status, result } } = await axios(config)
                                if (status) {
                                    // validations
                                    const cnaes = [...result.atividades_secundarias, result.atividade_principal].map(({ code }) => code)
                                    const cnaeIsValid = !!cnaes.filter(code => validCnaes.includes(code)).pop()
                                    // Caso consiga terminar a requisição com ignore_db = true lança a
                                    // prop finally = true para identificar que o cnpj está realmente inválido
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
                                } else throw { msg: 'CNPJ inválido na Receita', finally: true }
                            } catch (error) {
                                if (error.finally) throw error;
                                else throw { tryAgain: true };
                            }
                        } catch (error) {
                            throw error;
                        }
                    }
                    else throw error;
                }
            } catch (error) {
                // Caso receba o tryAgain, faz a 3º req. ignore_db = false
                if (error.tryAgain) {
                    config['data']['ignore_db'] = false;
                    setAlertMessage('A validação é demorada, aguarde');
                    try {
                        // Aguarda 20s e realiza a última req.
                        await setTimeout(async () => {
                            let result = await lastReq(config, validCnaes);
                            if (result.error) {
                                setCnpjValid(false);
                                setAlertMessage('');
                                reject(result.error);
                            }
                            else {
                                setReason(result.reason);
                                setFantasia(result.fantasia);
                                setStreet(result.street);
                                setNumber(result.number);
                                setComplement(result.complement);
                                setNeighborhood(result.neighborhood);
                                setCep(result.cep);
                                setCity(result.city);
                                setCityState(result.cityState);

                                // resolve
                                setCnpjValid(true);
                                setAlertMessage('');
                                resolve('CNPJ válido');
                            }
                        }, 20000);
                    } catch (error) {
                        throw error;
                    }
                } else throw error;
            }
        } catch (error) {
            // clear all fields
            console.log(error);
            setReason('');
            setFantasia('');
            setAlertMessage('');
            if (error.finally) reject({ msg: error.msg, customError: true });
            else reject(error);
        }
    });
};

export default searchCnpj