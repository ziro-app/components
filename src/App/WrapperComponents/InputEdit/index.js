import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InputEdit from '../../../components/InputEdit/index'
import { containerWithPadding } from '@ziro/theme'

export const InputEditWrapper = () => {
    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState('')
    const onChange = ({ target: { value } }) => setName(value)
    const validateInput = () => {
        if (name.length < 3) {
            setErrorName('pelo menos 3 caracteres')
            return false
        } else {
            setErrorName('')
            return true
        }
    }
    const submit = () => new Promise((resolve, reject) => setTimeout(() => resolve('OK'), 1000))
    return (
        <div style={containerWithPadding}>
            <InputEdit
                name='Nome'
                value={name}
                onChange={onChange}
                validateInput={validateInput}
                submit={submit}
                setError={setErrorName}
                error={errorName}
                warning='preencha o campo'
                placeholder='digite aqui...'
                isValidated={true}
                editable={true}
                isLoading={false}
            />
        </div >
    )
}

InputEditWrapper.propTypes = {
    /** Propriedade que define o nome da label acima do campo. */
    name: PropTypes.string.isRequired,
    /** Propriedade que define o conteúdo do campo. */
    value: PropTypes.string.isRequired,
    /** Propriedade que define a função a ser executada quando o conteúdo do campo é modificado. */
    onChange: PropTypes.func,
    /** Propriedade que define a função a ser executada para realizar a validação do conteúdo do campo. */
    validateInput: PropTypes.func,
    /** Propriedade que define a função a ser executada quando o formulário é submetido. */
    submit: PropTypes.func,
    /** Função executada para alterar as mensagens de erro. */
    setError: PropTypes.func,
    /** Propriedade que define a mensagem de erro. */
    error: PropTypes.string,
    /** Propriedade que define a mensagem de alerta. */
    warning: PropTypes.string,
    /** Propriedade que define o placeholder do campo. */
    placeholder: PropTypes.string,
    /** Propriedade que diz se o campo está preenchido corretamente. */
    isValidated: PropTypes.bool,
    /** Propriedade que define se o campo é editável. */
    editable: PropTypes.bool,
    /** Propriedade que diz se está sendo executado um processamento. */
    isLoading: PropTypes.bool
}