import { secondaryColor } from '@ziro/theme'

export const

container = {
    display: 'grid',
    padding: '10px',
    background: 'white',
    boxShadow: '0px -2px 4px 0px rgba(34,34,34,0.25)'
},

button = {
    height: '40px',
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    position: 'relative'
},

notification = {
    width: 18,
    height: 18,
    background: secondaryColor,
    position: 'absolute',
    top: '12%',
    right: '12%',
    borderRadius: '50%',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fontTitle,
    fontSize: '0.8rem',
    fontWeight: '600',
    boxShadow: '1px 1px 2px rgb(0,0,0,0.3)'
}