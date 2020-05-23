import React, { useState } from 'react'
import PropTypes from 'prop-types'
import maskInput from '@ziro/mask-input'
import { warningColor } from '@ziro/theme'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import searchCnpj from './searchCnpj'

const GetCnpj = ({ cnpj, setState, suppliers, setCnpjValid, validCnaes }) => {
    const [alertMessage, setAlertMessage] = useState('')
    const { setCnpj, ...rest } = setState
    const state = { cnpj, suppliers, setCnpjValid, validCnaes, setAlertMessage, ...rest }
    const validations = [
        {
            name: 'cnpj',
            validation: value => /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(value),
            value: cnpj,
            message: 'CNPJ inválido'
        }
    ]
    return (
        <>
            {alertMessage ?
                <div style={{ padding: '0 0 5px', height: '24px', fontSize: '1.6rem', color: warningColor, textAlign: 'center' }} >
                    <span>{alertMessage}</span>
                </div>
                : <div style={{ padding: '0 0 5px', height: '24px' }}>&nbsp;</div>
            }
            <Form
                buttonName='Validar CNPJ'
                buttonOnTop={true}
                validations={validations}
                sendToBackend={searchCnpj ? searchCnpj(state) : () => null}
                inputs={[
                    <FormInput name='cnpj' label='CNPJ' input={
                        <InputText
                            value={cnpj}
                            onChange={({ target: { value } }) => setCnpj(maskInput(value, '##.###.###/####-##', true))}
                            placeholder='00.111.222/0001-33'
                            inputMode='numeric'
                        />
                    } />
                ]}
            />
        </>
    )
}

GetCnpj.propTypes = {
    cnpj: PropTypes.string.isRequired,
    setState: PropTypes.object.isRequired,
    suppliers: PropTypes.array.isRequired,
    setCnpjValid: PropTypes.func.isRequired,
    validCnaes: PropTypes.array
}

export default GetCnpj