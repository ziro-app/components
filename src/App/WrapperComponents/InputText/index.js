import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import InputText from '../../../components/InputText'
import { containerWithPadding } from '@ziro/theme'

export const InputTextWrapper = (props) => {
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)
    const onChange = ({ target: { value } }) => setInputValue(value)
    const placeholder = 'Digite aqui seu email'
    const name = 'input'
    const inputProps = { ...props, value: inputValue, onChange, placeholder, name, ref: inputRef }

    return (
        <div style={containerWithPadding}>
            <p>&nbsp;{inputValue}</p>
            <InputText {...inputProps} />
        </div>
    )
}

InputTextWrapper.propTypes = {
    /** Objeto contendo propriedades de estilo utilizadas no input. */
    style: PropTypes.object,
    /** String contendo o estilo inline utilizado no input. */
    css: PropTypes.string,
    /** Define se o campo está ou não habilitado para edição. */
    disabled: PropTypes.bool,
    /** Define se o campo está sendo submetido. */
    submitting: PropTypes.bool
}