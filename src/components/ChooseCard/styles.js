import { primaryColor, secondaryColor, gradient, shadow } from '@ziro/theme'

export const

cardContainer = (selected) => ({
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0px 10px',
    borderRadius: '15px',
    background: selected ? '#F0F0F0' : 'transparent',
    border: selected ? '1px solid #C0C0C0' : '1px solid transparent'
}),

color = primaryColor