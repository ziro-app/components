
export const

shooterBtn= (size, disabled) => ({
	border: {
		display:'flex',
		width: size,
		height: size,
		borderRadius: '50%',
		borderWidth: '5px',
		borderStyle: 'solid',
		borderColor: disabled ? 'grey' : 'white',
		background: 'transparent',
		justifyContent: 'center',
		alignItems: 'center'
	},
	middle: {
		width: size-5,
		height: size-5,
		borderRadius: '50%',
		background: disabled ? 'grey' : 'white'
	}
}),

btn= (size,disabled) => ({
	display: 'flex',
	width: size,
	height: size,
	borderRadius: '50%',
	borderStyle: 'none',
	background: disabled ? 'rgba(200,200,200)' : 'rgba(0,0,0,0.5)',
	justifyContent: 'center',
	alignItems: 'center'
})