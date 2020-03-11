export const

container = {
    display: 'grid',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'hidden',
    margin: 'auto',
},

headerContainer = {
    position: 'fixed',
    top: '0',
    display: 'grid',
    width: '100%',
    boxSizing: 'border-box',
    background: 'white',
    boxShadow: '0px 2px 4px 0px rgba(34,34,34,0.25)',
    overflow: 'hidden',
    transformOrigin: '50% 0%'
},

footerContainer = {
    position: 'fixed',
    transformOrigin: '50% 100%',
    bottom: '0',
    display: 'grid',
    width: '100%',
    boxSizing: 'border-box',
    background: 'white',
    boxShadow: '0px -2px 4px 0px rgba(34,34,34,0.25)',
}