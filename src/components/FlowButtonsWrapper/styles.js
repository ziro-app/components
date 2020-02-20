export const

doubleButton = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '5%'
},

singleButton = {
    ...doubleButton,
    gridTemplateColumns: '1fr'
},

container = {
    display: 'grid',
    gridTemplateRows: '1fr auto',
    alignItems: 'center'
}