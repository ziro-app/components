import React from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import Dropdown from '../Dropdown'
import { tripleRow, middleItem, values } from './styles'

const _ChooseInstallmentRow = ({ installmentsOptions, installments, installmentValue, setInstallments }) => 
    <div style={tripleRow}>
        <Dropdown
            readOnly={true}
            value={installments||''}
            onChange={({ target: { value } }) => setInstallments(value)}
            list={installmentsOptions}
            placeholder='X'
            onChangeKeyboard={element => element ? setInstallments(element.value) : null }
        />
        <label style={{ ...values, textAlign: 'end' }}>{`${installments}x de ${currencyFormat(installmentValue)}`}</label>
    </div>

_ChooseInstallmentRow.propTypes = {
    installmentsOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    installments: PropTypes.string,
    installmentValue: PropTypes.string,
    setInstallments: PropTypes.func.isRequired
}

export const ChooseInstallmentRow = React.memo(_ChooseInstallmentRow)