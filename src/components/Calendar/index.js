import React, { useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import InputForDayPicker from './InputForDayPicker/index'
import formatDate from './formatDate'
import { dayPickerProps } from './dayPickerProps'

const Calendar = () => {
    const [inputDate, setInputDate] = useState('')
    return (
        <DayPickerInput
            component={InputForDayPicker}
            placeholder='Data início'
            value={inputDate}
            onDayChange={day => setInputDate(formatDate(day))}
            formatDate={formatDate}
            dayPickerProps={dayPickerProps}
        />
    )
}

export default Calendar