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
    const validCnaes = [];
    // Usar as env's
    const cnpjUrl = process.env.CNPJ_URL;
    const cnpjToken = process.env.CNPJ_TOKEN;
    const setState = {
        setCnpj, setCnpjValid, setReason, setFantasia, setStreet, setNumber,
        setComplement, setNeighborhood, setCep, setCity, setCityState, cnpjToken, cnpjUrl
    }

    return (
        <div style={containerWithPadding}>
            <GetCnpj cnpj={cnpj} setState={setState} suppliers={suppliers} setCnpjValid={setCnpjValid} validCnaes={validCnaes} />
        </div>
    );
};