import consultCnpj from './utils/consultCnpj';
import checkResult from './utils/checkResult';
import mountObject from './utils/mountObject';
import handleError from './utils/handleError';

const lastReq = async (config, validCnaes, state) => {
    let result = {};
    try {
        const [status, result] = await consultCnpj(config);
        const objResult = checkResult(status, result, validCnaes, false);
        mountObject(state, objResult);
        result['error'] = false;
    } catch (error) {
        result['error'] = error;
    } finally {
        return result;
    }
}

const searchCnpj = state => () =>
    new Promise(async (resolve, reject) => {
        const { cnpj, baseCnpj, setCnpjValid, validCnaes, cnpjUrl, cnpjToken, setFirstLabel, setIsOpen } = state;
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
            const [status, result] = await consultCnpj(config);
            const objResult = checkResult(status, result, validCnaes, false);
            mountObject(state, objResult);
            setIsOpen(false);
            setCnpjValid(true);
            setFirstLabel(true);
            resolve('CNPJ válido');
        } catch (error) {
            const errorMsg = await handleError(state, error);
            setFirstLabel(true);
            console.log('errorMsg',errorMsg)
            if (errorMsg.tryAgain) {
                setFirstLabel(false);
                await setTimeout(async () => {
                    config['data']['ignore_db'] = false;
                    let result = await lastReq(config, validCnaes, state);
                    console.log('result',result)
                    setIsOpen(false);
                    setFirstLabel(true);
                    if (result.error) {
                        setCnpjValid(false);
                        reject({ msg: result.error.msg, customError: true });
                    }
                    else {
                        setCnpjValid(true);
                        resolve('CNPJ válido');
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