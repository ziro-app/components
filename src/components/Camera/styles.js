export const

animateContainer = {
    position: 'relative',
    maxWidth: '500px',
    margin: 'auto'
},

container = (background) => ({
    display: 'grid',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
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