import { secondaryColor } from '@ziro/theme'

export const

container = {
    display: 'grid',
    padding: '10px',
    background: 'white',
    boxShadow: '0px -2px 4px 0px rgba(34,34,34,0.25)',
},

button = {
    height: '40px',
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    position: 'relative'
},

notification = {
    width: 15,
    height: 15,
    background: secondaryColor,
    position: 'absolute',
    top: '20%',
    right: '30%',
    borderRadius: '50%',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '1px 1px 2px rgb(0,0,0,0.3) '
}