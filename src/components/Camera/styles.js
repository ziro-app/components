import is from 'is_js'
export const

animateContainer = {
    position: 'relative'
},

container = (background) => ({
    display: 'grid',
    width: '100%',
    height: is.safari() ? '-webkit-fill-available' : '100vh',
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden',
    background
}),

overlay = {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
}