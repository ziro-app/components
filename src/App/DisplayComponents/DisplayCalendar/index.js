import React, { useState } from 'react'
import Calendar from '../../../components/Calendar/index'
import InputText from '../../../components/InputText/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayCalendar = () => {
    const [inputDate, setInputDate] = useState('')
    const [focused, setFocused] = useState(false)
    return (
        <div style={containerWithPadding}>
            <Calendar inputDate={inputDate} setInputDate={setInputDate} focused={focused} setFocused={setFocused} placeholder={'Data de início'} readOnly={true} />
            <div style={{marginTop: '20px'}}></div>
            <InputText placeholder='Data de início' />
        </div>
    )
}