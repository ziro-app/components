import React from 'react'
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import isAfterDay from 'react-dates/lib/utils/isAfterDay';
import isBeforeDay from 'react-dates/lib/utils/isBeforeDay';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import pt from 'moment/locale/pt-br'
import './styles.css'

// OutsideRange -> Flag que ativa/desativa o filtro nas datas
// Before = true -> Desabilita o intervalo anterior ao dia corrente ou a uma data específica
// Before = false -> Desabilita o intervalor posterior ao dia corrente ou a uma data específica
// Callback -> Função adicional executada ao modificar a data, caso necessite

const Calendar = ({ inputDate, setInputDate, focused, setFocused, placeholder, readOnly = true, outsideRange = false, before, choosedDate = '', callback = null }) => {
    moment.locale('pt-br', pt)
    const disableDates = day => {
        if(before){
            if(choosedDate) return isBeforeDay(day, moment(choosedDate.split('/').reverse().join('/')))
            else return isBeforeDay(day, moment())
        } else {
            if(choosedDate) return isAfterDay(day, moment(choosedDate.split('/').reverse().join('/')))
            else return isAfterDay(day, moment())
        }
    }
    return(
        <>
            <SingleDatePicker
                date={inputDate? moment(inputDate.split('/').reverse().join('/')) : null}
                onDateChange={date => {
                    if(date) setInputDate(date.format("DD/MM/YYYY"))
                    else setInputDate('')
                    if(callback) callback()
                }}
                focused={focused}
                onFocusChange={({ focused }) => setFocused(focused) }
                id="calendar"
                placeholder={placeholder}
                showClearDate={true}
                displayFormat={() => "DD/MM/YYYY"}
                numberOfMonths={1}
                readOnly={readOnly}
                hideKeyboardShortcutsPanel={true}
                isOutsideRange={outsideRange? day => disableDates(day) : () => false}
            />
        </>
    )
}

export default Calendar