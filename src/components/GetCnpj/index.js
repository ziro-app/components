import React, { useState } from 'react'
import PropTypes from 'prop-types'
import maskInput from '@ziro/mask-input'
import Form from '../Form'
import FormInput from '../FormInput'
import InputText from '../InputText'
import Modal from '../Modal'
import Illustration from '../Illustration'
import Spinner from '../Spinner'
import searchCnpj from './searchCnpj'
import { modalBox, container, title, svg } from './styles'
import validateCnpj from './utils/validateCnpj'
import TooltipHelp from '../TooltipHelp'

const GetCnpj = ({ cnpj, setState, baseCnpj, setCnpjValid, validCnaes, tooltip = false }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [firstLabel, setFirstLabel] = useState(true)
    const { setCnpj, ...rest } = setState
    const state = { cnpj, baseCnpj, setCnpjValid, validCnaes, setFirstLabel, setIsOpen, ...rest }
    const validations = [
        {
            name: 'cnpj',
            validation: value => /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(value) && validateCnpj(value),
            value: cnpj,
            message: 'CNPJ inválido'
        }
    ]

    const tooltipIcon = () => {
        const message = (
            <>
                <p>É preciso um dos seguintes CNAEs para se cadastrar no app.</p>
                <br/>
                <div style={{textAlign: 'justify'}}>
                    <p><strong>1412-6/01 -</strong> Confecção de peças de vestuário, exceto roupas íntimas e as confeccionadas sob medida.</p>
                    <p><strong>1412-6/03 -</strong> Facção de peças do vestuário, exceto roupas íntimas.</p>
                    <p><strong>4781-4/00 -</strong> Comércio varejista de artigos do vestuário e acessórios.</p>
                    <p><strong>7723-3/00 -</strong> Aluguel De Objetos Do Vestuário, Jóias E Acessórios</p>
                </div>
            </>
        )
        return (
        <>
            CNPJ
            {' '}
            <TooltipHelp
                illustration='onlyVestuary'
                title='Apenas CNAEs de Vestuário'
                body={message}
            />
        </>

    )}

    return (
        <>
            <Modal boxStyle={modalBox} isOpen={isOpen} setIsOpen={() => { }}>
                <div style={container}>
                    <div style={svg} ><Illustration type="waiting" size={200} /></div>
                    <label style={title}>{firstLabel ? 'Aguarde...' : 'Só mais um momento...'}</label>
                    <label>{firstLabel
                        ? 'Estamos validando seu CNPJ. Não saia da página'
                        : 'Estamos concluindo a validação. Não saia da página'}
                    </label>
                    <Spinner size='3rem' />
                </div>
            </Modal>
            <Form
                buttonName='Validar CNPJ'
                buttonOnTop={true}
                validations={validations}
                sendToBackend={searchCnpj ? searchCnpj(state) : () => null}
                inputs={[
                    <FormInput name='cnpj' label={tooltip ? tooltipIcon() : "CNPJ"} input={                            
                        <InputText
                            value={cnpj}
                            onChange={({ target: { value } }) => setCnpj(maskInput(value, '##.###.###/####-##', true))}
                            placeholder='00.111.222/0001-33'
                            inputMode='numeric'
                        />
                    }    
                    />
                ]}
            />
        </>
    )
}

GetCnpj.propTypes = {
    cnpj: PropTypes.string.isRequired,
    setState: PropTypes.object.isRequired,
    baseCnpj: PropTypes.array.isRequired,
    setCnpjValid: PropTypes.func.isRequired,
    validCnaes: PropTypes.array.isRequired
}

export default GetCnpj
