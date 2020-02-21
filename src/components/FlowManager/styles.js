export const

doubleButton = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '5%',
    padding: '5% 20px'
},

singleButton = {
    ...doubleButton,
    gridTemplateColumns: '1fr'
},

container = {
    overflow: 'hidden',
    display: 'grid',
    height: '85vh',
    gridTemplateRows: 'auto 1fr auto',
    padding: '20px 0px'
},

content = {
    overflowY: 'auto',
    overflowX: 'visible',
    padding: '0px 20px'
}