import { fontBody, fontSizeInput, primaryColor, grayColor1, grayColor2, grayColor3 } from '@ziro/theme'

export const

    input = {
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        outline: 'none',
        boxSizing: 'border-box',
        width: '100%',
        padding: '8px 22px',
        border: `2px solid ${grayColor3}`,
        borderRadius: '8px',
        fontFamily: `${fontBody}, 'system-ui', 'sans-serif'`,
        fontSize: fontSizeInput,
        color: primaryColor,
        backgroundColor: '#FDFDFD',
        boxShadow: `rgba(34,34,34,0.3) 0px 3px 10px -3px`
    },

    styleTag = `
	input:disabled {
		background: none;
	}
	input::placeholder {
    	color: ${grayColor2};
	}
	.input-text:focus {
		border: 2px solid ${grayColor1} !important;
		box-shadow: rgba(34, 34, 34, 0.3) 0px 3px 10px -2px !important;
	}
`,

    inputFocus = Object.assign({}, input, {
        boxShadow: `0px 0px 10px 0px rgba(48,62,77,0.08), 0px 0px 20px 0px rgba(48,62,77,0.06), 
	0px 0px 30px 0px rgba(48,62,77,0.04), 0px 0px 40px 0px rgba(48,62,77,0.02)`
    })