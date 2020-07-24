import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import maskInput from '@ziro/mask-input'
import { inline, styleTag } from './styles'

const InputPhone = forwardRef(({ setValue, landline = false, style = inline, css = styleTag, disabled, submitting, ...rest }, ref) => {
    const inputProps = { style, disabled: disabled || submitting, ref, inputMode: 'tel', placeholder: landline ? '(99) 9999-9999' : '(99) 99999-9999', ...rest }
    return (
        <>
            <style>{css}</style>
            <input {...inputProps} className='input-text' onChange={({ target: { value } }) => {
                let mask = (landline) ? '(##) ####-####' : '(##) #####-####';
                setValue(maskInput(value, mask, true));
            }} />
        </>
    )
})

InputPhone.propTypes = {
    setValue: PropTypes.func.isRequired,
    landline: PropTypes.bool,
    style: PropTypes.object,
    css: PropTypes.string,
    disabled: PropTypes.bool,
    submitting: PropTypes.bool
}

export default InputPhone