import consultCnpj from './consultCnpj';
import checkResult from './checkResult';
import mountObject from './mountObject';

const handleError = async ({ cnpj, setReason, setFantasia, validCnaes, cnpjUrl, cnpjToken, setFirstLabel, setIsOpen, ...rest }, error) => {
    if (error.customError) return error;
    else if (error.tryAgain) {
        let config = {
            method: 'POST',
            url: cnpjUrl,
            data: {
                cnpj,
                ignore_db: true
            },
            headers: {
                'Authorization': cnpjToken
            }
        };
        try {
            setReason('');
            setFantasia('');
            setIsOpen(true);
            setFirstLabel(true);
            const [status, result] = await consultCnpj(config);
            const objResult = checkResult(status, result, validCnaes, true);
            mountObject({ ...rest, setReason, setFantasia }, objResult);
            return { msg: 'CNPJ válido', success: true };
        } catch (error) {
            if (error.customError || error.tryAgain) return error;
            else if (error.finally) return { msg: error.msg, customError: true };
            else return { msg: 'Erro ao validar CNPJ, tente novamente.', customError: true };
        }
    }
    else return { msg: 'Erro na validação, tente novamente.', customError: true };
};

export default handleError