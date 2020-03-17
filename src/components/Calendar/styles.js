import { fontBody, fontSizeInput, primaryColor, grayColor1, grayColor3 } from '@ziro/theme'

export const styleTag = `
	.SingleDatePickerInput__showClearDate_3 {
        WebkitAppearance: none;
        MozAppearance: none;
        outline: none;
        box-sizing: border-box;
        width: 100%;
        border: 2px solid ${grayColor3};
        border-radius: 8px;
        font-family: ${fontBody}, system-ui, sans-serif;
        font-size: ${fontSizeInput};
        color: ${primaryColor};
        background-color: '#FDFDFD';
        box-shadow: rgba(34,34,34,0.3) 0px 3px 10px -3px;
    }
`, 
styleTagFocus = `
    .SingleDatePickerInput__showClearDate_3 {
        WebkitAppearance: none;
        MozAppearance: none;
        outline: none;
        box-sizing: border-box;
        width: 100%;
        border: 2px solid ${grayColor1} !important;
        border-radius: 8px;
        font-family: ${fontBody}, system-ui, sans-serif;
        font-size: ${fontSizeInput};
        color: ${primaryColor};
        background-color: '#FDFDFD';
        box-shadow: rgba(34, 34, 34, 0.3) 0px 3px 10px -2px !important;
    }
`