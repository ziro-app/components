import React, { useState, useRef } from 'react'
import InputMoney from '../../../components/InputMoney/index'
import Button from '../../../components/Button/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayInputMoney = () => {
    const [inputValue, setInputValue] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const inputRef = useRef(null)
    const name = 'input'
    const inputProps = { value: inputValue, submitting, name, ref: inputRef, setValue: setInputValue }
    return (
        <div style={containerWithPadding}>
            <p>&nbsp;{inputValue}</p>
            <InputMoney {...inputProps} />
            <div style={{ display: 'grid', marginTop: '40px' }} onClick={() => setSubmitting(!submitting)}><Button type='submit' cta='Disable input' /></div>
        </div>
    )
}