import { gradient, shadow } from '@ziro/theme'

export const 

circularButtonContainer = (template) => ({
    display: 'grid',
    gridTemplateColumns: '40px auto',
    width: '250px',
    height: '45px',
    borderRadius: '20px',
    background: template === 'light' ? 'linear-gradient(rgb(240, 240, 240) 10%, rgb(245, 245, 245) 30%, rgb(250, 250, 250) 60%, rgb(255, 255, 255))' : gradient,
    color: template === 'light' ? '#333' : '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: shadow
}),

dropzone = {
    display: 'grid',
    alignContent: 'center',
    justifyItems: 'center',
    gridRowGap: '20px',
    border: `2px dashed grey`,
    borderRadius: '6px',
    color: 'black',
    textAlign: 'center',
    padding: '20px',
    minHeight: 'calc(100vh - 230px)'
}