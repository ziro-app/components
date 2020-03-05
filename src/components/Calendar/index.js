import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import InputForDayPicker from './InputForDayPicker/index'
import formatDate from './formatDate'
import { dayPickerProps } from './dayPickerProps'
import 'react-day-picker/lib/style.css'

const Calendar = ({ inputDate, setInputDate }) => {
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