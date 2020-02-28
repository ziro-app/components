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
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'grid',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    gridTemplateRows: 'auto 1fr auto',
    padding: '20px 0px',
},

content = {
    overflowY: 'auto',
    overflowX: 'visible',
    padding: '0px 20px'
},

scrollShadowTop = (insetTop, maxInset) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: '20px',
    background: 'linear-gradient(#00000030 10%, #00000020 30%, #00000010 60%, #00000000)',
    opacity: insetTop && maxInset ? insetTop/maxInset : 0
}),

scrollShadowBottom = (insetBottom, maxInset) => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: '20px',
    background: 'linear-gradient(#00000000 10%, #00000010 30%, #00000020 60%, #00000030)',
    opacity: insetBottom && maxInset ? insetBottom/maxInset : 0
})