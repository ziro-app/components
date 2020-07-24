import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import maskInput from '@ziro/mask-input'
import { inline, styleTag } from './styles'

const mountMask = number => {
    let i = 1;
    let mask = '';
    while (i <= number) {
        mask += '#';
        i += 1;
    }
    return mask;
}

const InputMoney = forwardRef(({ value, setValue, numberOfDigits = 7, style = inline, css = styleTag, disabled, submitting, ...rest }, ref) => {
    const inputProps = { style, disabled: disabled || submitting, ref, inputMode: 'numeric', placeholder: 'R$1.299,99', ...rest }
    return (
        <>
            <style>{css}</style>
            <input {...inputProps} className='input-text' value={currencyFormat(value)} onChange={({ target: { value } }) => {
                const toInteger = parseInt(value.replace(/[R$\.,]/g, ''), 10);
                let mask = (numberOfDigits > 0 && numberOfDigits !== 7) ? mountMask(numberOfDigits) : '#######';
                setValue(maskInput(toInteger, mask, true));
            }} />
        </>
    )
})

InputMoney.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    numberOfDigits: PropTypes.number,
    style: PropTypes.object,
    css: PropTypes.string,
    disabled: PropTypes.bool,
    submitting: PropTypes.bool
}

export default InputMoney