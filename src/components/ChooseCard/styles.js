import { primaryColor, secondaryColor, gradient, shadow, grayColor1, grayColor3, fontBody } from '@ziro/theme'

export const

container = {
    display: 'grid',
    alignItems: 'start',
    height: '100%',
    alignContent: 'start',
    padding: '10px 0px'
},

cardContainer = (selected) => ({
    zIndex: selected ? 10 : 0,
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 20px',
    borderRadius: '15px',
    border: `2px solid ${ selected ? grayColor1 : 'transparent'}`,
    gridColumnGap: '20px',
    boxShadow: `${ selected ? 'rgba(34,34,34,0.3)' : 'transparent'} 0px 3px 10px -3px`,
    margin: '-1px 0px'
}),

separator = {
    background: '#e0e0e0',
    height: '1px',
    margin: '0px 50px'
},

cardNumber = {
    fontFamily: fontBody,
    color: primaryColor
}