import { btn as defBtn } from '../Button/styles'
import { fontTitle, fontSizeInput, gradient } from '@ziro/theme'

export const

imageContainer = {
	padding: '10px 0px',
	width: '100%',
},

buttonContainer = {
	display: 'flex',
	justifyContent: 'space-between',
	textAlign: 'center',
	padding: '10px 0px',
},

btn = (half, picture) => ({
	...defBtn,
	...(half ? {
		display: 'inline',
		width: '45%',
	}:{}),
	background: picture ? "linear-gradient(#BA3A3A 10%, #B33 30%, #B22 60%, #800)" : gradient,
}),

inputBtn = {
	...defBtn,
	display: 'inline',
	width: '45%',
	justifyContent: 'center',
},

input = {
	fontFamily: fontTitle,
	fontSize: fontSizeInput,
	color: '#FFF',
}