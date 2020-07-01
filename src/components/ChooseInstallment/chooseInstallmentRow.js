import React from 'react'
import { arrayOf, string, func } from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import Dropdown from '../Dropdown'
import { chooseInstallmentContainer, installmentsRow } from './styles'

const _ChooseInstallmentRow = ({ installmentsOptions, installments, installmentValue, setInstallments }) => 
    <div style={chooseInstallmentContainer}>
        <Dropdown
            value={installments||''}
            onChange={({ target: { value } }) => setInstallments(value)}
            list={installmentsOptions}
            placeholder='0'
            onChangeKeyboard={element => element ? setInstallments(element.value) : null }
        />
        { installments && <label style={installmentsRow}>{`${installments}x de ${currencyFormat(installmentValue)}`}</label> }
    </div>

_ChooseInstallmentRow.propTypes = {
    installmentsOptions: arrayOf(string).isRequired,
    installments: string,
    installmentValue: string,
    setInstallments: func.isRequired
}

export const ChooseInstallmentRow = React.memo(_ChooseInstallmentRow)