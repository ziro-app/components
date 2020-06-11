import { fontTitle, primaryColor } from '@ziro/theme'

export const

    modalBox = {
        zIndex: '999',
        display: 'grid',
        gridTemplateColumns: '80%',
        justifyContent: 'center',
        maxWidth: '300px',
        width: '90%',
        paddingBottom: '20px',
        boxSizing: 'border-box',
        borderRadius: '3px',
        textAlign: 'center',
        background: 'white',
        boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.15), 1px 0px 8px 0px rgba(34,34,34,0.10),
	1px 0px 8px 0px rgba(34,34,34,0.05)`
    },

    container = {
        display: 'grid',
        gridRowGap: '15px',
        color: primaryColor
    },

    svg = {
        justifySelf: 'center'
    },

    title = {
        marginTop: '-20px',
        fontFamily: fontTitle,
        textTransform: 'uppercase'
    }
