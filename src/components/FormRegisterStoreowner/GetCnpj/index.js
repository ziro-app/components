import React from 'react'
import PropTypes from 'prop-types'
import maskInput from '@ziro/mask-input'
import Form from '../../Form/index'
import FormInput from '../../FormInput/index'
import InputText from '../../InputText/index'

const GetCnpj = ({ cnpj, setState, storeowners, setCnpjValid, searchCnpj }) => {
    const { setCnpj, ...rest } = setState
    const state = { cnpj, storeowners, setCnpjValid, ...rest }
    return (
        <Form
            buttonName='Validar CNPJ'
            buttonOnTop={true}
            validations={[]}
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
    )
}

GetCnpj.propTypes = {
    cnpj: PropTypes.string.isRequired,
    setState: PropTypes.object.isRequired,
    storeowners: PropTypes.array.isRequired,
    setCnpjValid: PropTypes.func.isRequired
}

export default GetCnpj