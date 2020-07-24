import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { inline, styleTag } from './styles'

const InputEmail = forwardRef(({ setValue, style = inline, css = styleTag, disabled, submitting, ...rest }, ref) => {
    const inputProps = { style, disabled: disabled || submitting, ref, inputMode: 'email', autoComplete: 'email', placeholder: 'ex@exemplo.com', ...rest }
    return (
        <>
            <style>{css}</style>
            <input {...inputProps} className='input-text' onChange={({ target: { value } }) => setValue(value.toLowerCase().replace(/\s/g, ''))} />
        </>
    )
})

InputEmail.propTypes = {
    setValue: PropTypes.func.isRequired,
    style: PropTypes.object,
    css: PropTypes.string,
    disabled: PropTypes.bool,
    submitting: PropTypes.bool
}

export default InputEmail