import { primaryColor, secondaryColor, gradient } from '@ziro/theme'

export const

cardContainer = (selected) => ({
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0px 10px',
    borderRadius: '15px',
    background: selected ? gradient : 'transparent'
}),

color = (selected) => selected ? secondaryColor : primaryColor