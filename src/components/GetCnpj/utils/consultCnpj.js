import axios from 'axios';

const consultCnpj = async (config) => {
    try {
        const { data: { status, result } } = await axios(config);
        return [status, result];
    } catch (error) {
        throw { msg: 'Erro ao realizar consulta', tryAgain: true };
    }
};

export default consultCnpj;