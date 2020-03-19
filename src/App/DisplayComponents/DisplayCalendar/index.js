import React, { useState } from 'react'
import Calendar from '../../../components/Calendar/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayCalendar = () => {
    const [inputDate, setInputDate] = useState('')
    const [focused, setFocused] = useState(false)
    return (
        <div style={containerWithPadding}>
            <Calendar inputDate={inputDate} setInputDate={setInputDate} focused={focused} setFocused={setFocused} placeholder={'Data de início'} readOnly={true} />
        </div>
    )
}