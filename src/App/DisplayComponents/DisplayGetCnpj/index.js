import React, { useState } from 'react'
import GetCnpj from '../../../components/GetCnpj/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayGetCnpj = () => {
    const [cnpj, setCnpj] = useState('')
    const [reason, setReason] = useState('')
    const [fantasia, setFantasia] = useState('')
    const [suppliers, setSuppliers] = useState([])
    const [cnpjValid, setCnpjValid] = useState(false)
    const [cep, setCep] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [complement, setComplement] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [city, setCity] = useState('')
    const [cityState, setCityState] = useState('')
    const [fone, setFone] = useState('')
    const validCnaes = ['47.81-4-00', '14.12-6-01', '14.12-6-03'];
    // Usar as env's
    const cnpjUrl = process.env.CNPJ_URL || '';
    const cnpjToken = process.env.CNPJ_TOKEN || '';
    const setState = {
        setCnpj, setCnpjValid, setReason, setFantasia, setStreet, setNumber,
        setComplement, setNeighborhood, setCep, setCity, setCityState, cnpjToken, cnpjUrl, setFone
    }

    return (
        <div style={containerWithPadding}>
            <GetCnpj cnpj={cnpj} setState={setState} baseCnpj={suppliers} setCnpjValid={setCnpjValid} validCnaes={validCnaes} />
            <p>{cnpjValid ? 'true' : 'false'}</p>
            <p>{cnpj}</p>
            <p>{reason}</p>
            <p>{fantasia}</p>
            <p>{cep}</p>
            <p>{street}</p>
            <p>{number}</p>
            <p>{complement}</p>
            <p>{neighborhood}</p>
            <p>{city}</p>
            <p>{cityState}</p>
            <p>{fone}</p>
        </div>
    );
};