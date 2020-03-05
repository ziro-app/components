import { fontBody, fontSizeInput, primaryColor, grayColor3 } from '@ziro/theme'

export const

    input = {
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        outline: 'none',
        boxSizing: 'border-box',
        border: `2px solid ${grayColor3}`,
        borderRadius: '8px',
        fontFamily: `${fontBody}, 'system-ui', 'sans-serif'`,
        width: '100%',
        height: '30px',
        padding: '8px 22px',
        backgroundColor: '#FDFDFD',
        fontSize: fontSizeInput,
        color: primaryColor,
        boxShadow: `rgba(34,34,34,0.3) 0px 3px 10px -3px`
    },

    inputFocus = Object.assign({}, input, {
        boxShadow: `0px 0px 10px 0px rgba(48,62,77,0.08), 0px 0px 20px 0px rgba(48,62,77,0.06), 
	0px 0px 30px 0px rgba(48,62,77,0.04), 0px 0px 40px 0px rgba(48,62,77,0.02)`
    })