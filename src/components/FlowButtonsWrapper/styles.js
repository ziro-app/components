export const

doubleButton = {
    display: 'grid',
    margin: '5%',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '5%',
    bottom: 0,
},

singleButton = {
    ...doubleButton,
    gridTemplateColumns: '1fr'
},

container = {
    display: 'grid',
    height: '100vh',
    alignContent: 'space-between',
    gridTemplateRows: 'auto auto'
}