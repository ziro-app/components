import React from 'react'
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import pt from 'moment/locale/pt-br'

const Calendar = ({ inputDate, setInputDate, focused, setFocused, placeholder, readOnly = true }) => {
    moment.locale('pt-br', pt)
    return(
        <SingleDatePicker
            date={inputDate}
            onDateChange={date => date? setInputDate(date) : setInputDate('')}
            focused={focused}
            onFocusChange={({ focused }) => setFocused(focused) }
            id="calendar"
            placeholder={placeholder}
            showClearDate={true}
            showDefaultInputIcon={true}
            displayFormat={() => "DD/MM/YYYY"}
            numberOfMonths={1}
            readOnly={readOnly}
            hideKeyboardShortcutsPanel={true}
        />
    )
}

export default Calendar