import React, { forwardRef } from 'react'
import { input, inputFocus, styleTag } from './styles'

const InputForDayPicker = forwardRef((props, ref) => {
    return (
        <>
            <style>{styleTag}</style>
            <input
                readOnly={true}
                onKeyPress={event => event.preventDefault()}
                style={props.value ? inputFocus : input}
                {...props}
            />
        </>
    )
})

export default InputForDayPicker