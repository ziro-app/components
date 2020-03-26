import { gradient, shadow } from '@ziro/theme'

export const 

circularButtonContainer = (template) => ({
    display: 'grid',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: template === 'light' ? 'linear-gradient(rgb(240, 240, 240) 10%, rgb(245, 245, 245) 30%, rgb(250, 250, 250) 60%, rgb(255, 255, 255))' : gradient,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: shadow
}),

dropzone = {
    display: 'grid',
    alignContent: 'center',
    justifyItems: 'center',
    gridRowGap: '15px',
    border: `2px dashed grey`,
    borderRadius: '6px',
    color: 'black',
    textAlign: 'center',
    padding: '20px'
}