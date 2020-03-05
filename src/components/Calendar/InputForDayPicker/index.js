import React, { forwardRef } from 'react'
import { input, inputFocus } from './styles'

const InputForDayPicker = forwardRef((props, ref) => {
    return (
        <input
            readOnly={true}
            onKeyPress={event => event.preventDefault()}
            style={props.value ? inputFocus : input}
            {...props}
        />
    )
})

export default InputForDayPicker