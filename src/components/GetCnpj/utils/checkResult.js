const checkResult = (status, result, validCnaes, ignoreDb) => {
    if (status) {
        let objResult = {};
        // validations
        const cnaes = [...result.atividades_secundarias, result.atividade_principal].map(({ code }) => code);
        const cnaeIsValid = !!cnaes.filter(code => validCnaes.includes(code)).pop();
        const isActive = result.situacao === 'ATIVA';
        if (!cnaeIsValid || !isActive) {
            if (ignoreDb) throw { msg: !cnaeIsValid ? 'CNPJ não tem CNAE válido' : 'CNPJ não está ativo', finally: true };
            else throw { msg: !cnaeIsValid ? 'CNPJ não tem CNAE válido' : 'CNPJ não está ativo', tryAgain: true };
        }
        objResult['reason'] = result.nome;
        objResult['fantasia'] = result.fantasia;
        objResult['street'] = result.logradouro;
        objResult['number'] = result.numero;
        objResult['complement'] = result.complemento;
        objResult['neighborhood'] = result.bairro;
        objResult['cep'] = result.cep.replace('.', '');
        objResult['city'] = result.municipio;
        objResult['cityState'] = result.uf;
        return objResult;
    } else throw { msg: 'CNPJ inválido na Receita', customError: true };
};

export default checkResult;