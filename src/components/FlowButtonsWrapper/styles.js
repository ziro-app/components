export const

doubleButton = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '5%',
    padding: '5% 0px'
},

singleButton = {
    ...doubleButton,
    gridTemplateColumns: '1fr'
},

container = {
    display: 'grid',
    height: '85vh',
    gridTemplateRows: 'auto 1fr auto',
    padding: '5vh 20px'
},

content = {
    overflow: 'scroll'
}