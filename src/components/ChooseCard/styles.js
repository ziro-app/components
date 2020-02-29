import { primaryColor, secondaryColor, gradient, shadow, grayColor1, grayColor3 } from '@ziro/theme'

export const

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

color = primaryColor