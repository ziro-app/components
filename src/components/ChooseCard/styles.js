import { primaryColor, fontBody } from '@ziro/theme'

export const

container = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gridColumnGap: '10px'
},

cardContainer = {
    display: 'grid',
    gridTemplateColumns: '60px 1fr 40px',
    boxShadow: '0px 0px 3px 0px rgba(34, 34, 34, 0.3)',
    height: '60px',
    alignItems: 'center',
    margin: '5px 0px',
    justifyItems: 'center'
},

brandContainer = {
    display: 'grid',
    width: 60,
    height: 60,
    background: '#303030',
    alignItems: 'center',
    justifyContent: 'center'
},

cardNumber = {
    fontFamily: fontBody,
    color: primaryColor,
    textAlign: 'center'
}