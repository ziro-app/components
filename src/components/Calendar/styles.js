import { fontBody, fontSizeInput, primaryColor, grayColor1, grayColor3 } from '@ziro/theme'

export const styleTag = `
    .DateInput {
        margin: 0;
        padding: 0;
        background: #fff;
        position: relative;
        display: inline-block;
        width: 80%;
        vertical-align: middle;
    }

    .SingleDatePicker_1 {
        WebkitAppearance: none;
        MozAppearance: none;
        outline: none;
        box-sizing: border-box;
        width: 100%;
        border-radius: 8px;
        font-family: ${fontBody}, system-ui, sans-serif;
        font-size: ${fontSizeInput};
        color: ${primaryColor};
        background-color: '#FDFDFD';
        border: 2px solid ${grayColor3};
        box-shadow: rgba(34,34,34,0.3) 0px 3px 10px -3px;
    }

    .SingleDatePickerInput__showClearDate {
        border: none;
        padding-right: 0;
    }
`,
 styleTagFocus = `
    .DateInput {
        margin: 0;
        padding: 0;
        background: #fff;
        position: relative;
        display: inline-block;
        width: 80%;
        vertical-align: middle;
    }

    .SingleDatePicker_1 {
        WebkitAppearance: none;
        MozAppearance: none;
        outline: none;
        box-sizing: border-box;
        width: 100%;
        border-radius: 8px;
        font-family: ${fontBody}, system-ui, sans-serif;
        font-size: ${fontSizeInput};
        color: ${primaryColor};
        background-color: '#FDFDFD';
        box-shadow: rgba(34,34,34,0.3) 0px 3px 10px -3px;
        border: 2px solid ${grayColor1} !important;
        box-shadow: rgba(34, 34, 34, 0.3) 0px 3px 10px -2px !important;
    }

    .SingleDatePickerInput__showClearDate {
        border: none;
        padding-right: 0;
    }
 `