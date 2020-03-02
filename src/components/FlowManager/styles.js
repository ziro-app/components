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
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    gridTemplateRows: 'auto auto 1fr auto',
    paddingTop: '20px',
    boxSizing: 'border-box'
},

content = {
    position: 'relative',
    overflowX: 'hidden',
    padding: '0px 20px'
},

contentContainer = {
    position: 'relative',
    display: 'grid',
    gridTemplate: 'auto'
},

scrollShadowTop = (insetTop, maxInset) => ({
    zIndex: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: '20px',
    background: 'linear-gradient(#00000030 10%, #00000020 30%, #00000010 60%, #00000000)',
    opacity: insetTop && maxInset ? insetTop/maxInset : 0
}),

scrollShadowBottom = (insetBottom, maxInset) => ({
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: '20px',
    background: 'linear-gradient(#00000000 10%, #00000010 30%, #00000020 60%, #00000030)',
    opacity: insetBottom && maxInset ? insetBottom/maxInset : 0
})