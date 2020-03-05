import React, { useState } from 'react'
import Calendar from '../../../components/Calendar/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayCalendar = () => {
    const [inputDate, setInputDate] = useState('')
    return (
        <div style={containerWithPadding}>
            <Calendar inputDate={inputDate} setInputDate={setInputDate} />
        </div>
    )
}