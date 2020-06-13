import consultCnpj from './utils/consultCnpj';
import checkResult from './utils/checkResult';
import mountObject from './utils/mountObject';
import handleError from './utils/handleError';
import axios from 'axios'
import arrayObject from '@ziro/array-object'

const lastReq = async (config, validCnaes, state, objectSheet) => {
    let result = {};
    try {
        const [status, result] = await consultCnpj(config);
        const objResult = checkResult(status, result, validCnaes, false, objectSheet);
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
        const { cnpj, baseCnpj, setCnpjValid, validCnaes, cnpjUrl, cnpjToken, sheetUrl,sheetId,sheetToken, setFirstLabel, setIsOpen } = state;
        let config = {
            method: 'POST',
            url: cnpjUrl,
            data: { cnpj },
            headers: {
                'Authorization': cnpjToken
            }
        };
        let configSheet = {
            method: 'POST',
            url: sheetUrl,
            data: {
                "apiResource": "values",
                "apiMethod": "batchGet",
                "spreadsheetId": sheetId,
                "ranges": ["Base CNPJ!A:B"]
            },
            headers: {
                'Authorization': sheetToken,
                'Content-Type': 'application/json',
                'Origin': 'https://ziro.app'
            }
        }
        try {
            let dadosSheet = await axios(configSheet)
            let objectSheet = arrayObject(dadosSheet.data.valueRanges[0]).filter(item => item.cnpj === Number(cnpj.replace('.','').replace('.','').replace('/','').replace('-','')))
            if (cnpj.length !== 18) throw { msg: 'Deve ter 14 números', customError: true };
            if (baseCnpj.includes(cnpj)) throw { msg: 'CNPJ já cadastrado', customError: true };
            const [status, result] = await consultCnpj(config);
            const objResult = checkResult(status, result, validCnaes, false, objectSheet);
            mountObject(state, objResult);
            setIsOpen(false);
            setCnpjValid(true);
            setFirstLabel(true);
            resolve('CNPJ válido');
        } catch (error) {
            console.log(error)
            return 'batata'
            const errorMsg = await handleError(state, error, objectSheet);
            setFirstLabel(true);
            if (errorMsg.tryAgain) {
                setFirstLabel(false);
                await setTimeout(async () => {
                    config['data']['ignore_db'] = false;
                    let result = await lastReq(config, validCnaes, state, objectSheet);
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