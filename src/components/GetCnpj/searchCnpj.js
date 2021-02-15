import consultCnpj from './utils/consultCnpj';
import checkResult from './utils/checkResult';
import mountObject from './utils/mountObject';
import handleError from './utils/handleError';
import validateCnpj from './utils/validateCnpj'

const lastReq = async (config, validCnaes, customValidation, state) => {
    let result = {};
    try {
        const [status, result] = await consultCnpj(config);
        const objResult = checkResult(status, result, validCnaes, customValidation, false);
        mountObject(state, objResult);
        result['ok'] = true
        result['error'] = false;
        return result
    } catch (error) {
        result['error'] = error;
        return result
    }
}

const searchCnpj = state => () =>
    new Promise(async (resolve, reject) => {
        const { cnpj, baseCnpj, setCnpjValid, validCnaes, cnpjUrl,
            cnpjToken, setFirstLabel, setIsOpen, customValidation } = state;
        let config = {
            method: 'POST',
            url: cnpjUrl,
            data: { cnpj },
            headers: {
                'Authorization': cnpjToken
            }
        };
        try {
            if (cnpj.length !== 18) throw { msg: 'Deve ter 14 números', customError: true };
            if (baseCnpj.includes(cnpj)) throw { msg: 'CNPJ já cadastrado', customError: true };
            if (!validateCnpj(cnpj)) throw { msg: 'CNPJ inválido', customError: true };
            const [status, result] = await consultCnpj(config);
            const objResult = checkResult(status, result, validCnaes, customValidation, false);
            mountObject(state, objResult);
            setIsOpen(false);
            setCnpjValid(true);
            setFirstLabel(true);
            resolve('CNPJ válido');
        } catch (error) {
            const errorMsg = await handleError(state, error);
            setFirstLabel(true);
            if (errorMsg.tryAgain) {
                setFirstLabel(false);
                await setTimeout(async () => {
                    config['data']['ignore_db'] = false;
                    let resultado = await lastReq(config, validCnaes, customValidation, state);
                    setIsOpen(false);
                    setFirstLabel(true);
                    if (resultado.error) {
                        setCnpjValid(false);
                        reject({ msg: resultado.error.msg, customError: true });
                    }
                    else if (resultado.ok) {
                        setCnpjValid(true);
                        resolve('CNPJ válido');
                    }
                    else {
                        setCnpjValid(false);
                        reject({ msg: 'Ocorreu um erro, tente novamente', customError: true });
                    }
                }, 30000);
            }
            else if (errorMsg.success) {
                setIsOpen(false);
                setFirstLabel(true);
                setCnpjValid(true);
                resolve(errorMsg.msg);
            } else {
                setIsOpen(false);
                setFirstLabel(true);
                setCnpjValid(false);
                reject(errorMsg);
            }
        }
    });

export default searchCnpj